import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckService } from './app.health-check.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './api/users/users.module';
import { LoggerMiddleware } from './middlewares/roles.middleware';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useClass: HealthCheckService
    }),
    TypeOrmModule.forRoot(),
    UsersModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
  constructor(private connection: Connection) {
    // Automatic migrations
    this.runMigrations();
  }

  public runMigrations = async () => {
    const migrationsPending = await this.connection.showMigrations();
    if (migrationsPending) {
      const migrations = await this.connection.runMigrations({ transaction: 'all' });
      migrations.forEach((migration) => {
        Logger.log(`Migration ${migration.name} success`);
      });
    } else {
      Logger.log('No migrations pending');
    }
  };
}
