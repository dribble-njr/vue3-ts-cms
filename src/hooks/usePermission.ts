import { useLogin } from '@/stores/login'

export function usePermission(pageName: string, handleName: string) {
  const permissions = useLogin().permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)
}
