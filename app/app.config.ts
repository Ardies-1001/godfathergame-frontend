export default defineAppConfig({
  ui: {
    notifications: {
      // Show toasts at the top center
      position: 'top-center'
    },
    notification: {
      default: {
        variant: 'solid'
      }
    },
    toaster: {
      position: 'top-center',
      duration: 4000
    }
  }
})
