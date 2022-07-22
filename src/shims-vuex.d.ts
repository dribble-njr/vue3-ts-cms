import store from '@/stores' // path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: store
    $filters
  }
}
