export const roleDictionary = (role: number) => {
   const roleValue = { 1: 'public',
    2: 'private',
    3: 'admin'}

    return roleValue[role] || 'none';
}