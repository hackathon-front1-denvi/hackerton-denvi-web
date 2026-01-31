'use client'

import '@/shared/lib/firebase'
import '@/shared/lib/gtag'

import { CUSTOM_APP_URL_HOST, CUSTOM_APP_URL_SCHEME } from '@/enum/scheme'
import { usePathname, useRouter } from '@/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { env } from '@/shared/lib/env'
import { useTheme } from '@/shared/providers/ThemeProvider'
import { App } from '@capacitor/app'

export interface MaintenanceProviderProps {
  children: React.ReactNode
}

const MaintenanceProvider = ({ children }: MaintenanceProviderProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const toast = useToast()
  const themeContextValue = useTheme()

  const handleUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      const isCustom = parsedUrl.protocol.startsWith(CUSTOM_APP_URL_SCHEME)
      const isHttp = parsedUrl.hostname === CUSTOM_APP_URL_HOST

      if (!isCustom && !isHttp) {
        return
      }

      const pathname = isCustom ? '/' + parsedUrl.host : parsedUrl.pathname
      const search = parsedUrl.search

      const skipPaths = ['/devmode', '/i']
      if (skipPaths.find(skipPath => pathname.endsWith(skipPath)) == null) {
        // client loading 이 안된 경우가 있어 300ms 후 이동
        setTimeout(() => {
          router.push(`${pathname}${search}`)
        }, 300)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const registerAppUrlOpen = async () => {
    await App.addListener('appUrlOpen', async ({ url }: { url: string }) => {
      handleUrl(url)
    })
  }

  // const registerDeviceBack = useCallback(async () => {
  //   // android back button with exit app
  //   if (platform === 'android') {
  //     let lastTimeBackPressed = 0
  //     await App.addListener('backButton', async ({ canGoBack }) => {
  //       if (!canGoBack) {
  //         const currentTime = Date.now()
  //         if (currentTime - lastTimeBackPressed < 2000) {
  //           await App.exitApp()
  //         } else {
  //           lastTimeBackPressed = currentTime
  //           toast('success', '뒤로 버튼을 한 번 더 누르시면 앱이 종료됩니다')
  //         }
  //       } else {
  //         window.history.back()
  //       }
  //     })
  //   }
  //   // ios back gesture
  //   if (platform === 'ios') {
  //     await CapacitorSwipeBackPlugin.enable()
  //   }
  // }, [platform])

  // const fetchAppInfo = async (isNativePlatform: boolean) => {
  //   if (isNativePlatform) {
  //     const appInfo = await App.getInfo()
  //     setAppInfo(appInfo)
  //   }
  // }

  // const registerDevice = useCallback(async () => {
  // TODO:
  // if (appInfo == null) {
  //   return
  // }
  // const [{ identifier: deviceId }, deviceInfo] = await Promise.all([Device.getId(), Device.getInfo()])
  // await Promise.all([
  //   PushNotifications.addListener('registration', async ({ value: fcmToken }) => {
  //     createDevice({
  //       name: deviceInfo.name ?? 'unknown',
  //       device_id: deviceId,
  //       fcm_token: fcmToken,
  //       device_type: platform === 'android' ? DeviceType.android : DeviceType.ios,
  //       app_version: appInfo.version
  //     })
  //   }),
  //   PushNotifications.addListener('registrationError', (error) => {
  //     console.error(error)
  //   }),
  //   PushNotifications.addListener('pushNotificationActionPerformed', async ({ notification, actionId }) => {
  //     if (actionId === 'tap' && notification.data.link != null) {
  //       handleUrl(notification.data.link as string)
  //     }
  //   })
  // ])
  // let permStatus = await PushNotifications.checkPermissions()
  // if (permStatus.receive === 'prompt') {
  //   permStatus = await PushNotifications.requestPermissions()
  // }
  // if (permStatus.receive === 'granted') {
  //   await PushNotifications.register()
  // }
  // }, [appInfo, platform])

  // useEffect(() => {
  //   setIsOpenUpdateModal(isRequireUpdate() || isRequireForceUpdate())
  // }, [appConfig, appInfo, platform])

  // TODO:
  // useEffect(() => {
  //   // 재접근시 항시 SafeArea 숨김 (full screen)
  //   const hideSafeAreaInset = () => {
  //     SafeArea.hideSafeAreaInset().catch(console.error)
  //   }
  //   hideSafeAreaInset()
  //   window.addEventListener('popstate', hideSafeAreaInset)
  //   return () => {
  //     window.removeEventListener('popstate', hideSafeAreaInset)
  //   }
  // }, [pathname])

  // useEffect(() => {
  //   const isNativePlatform = window.Capacitor?.isNativePlatform() ?? false

  //   const platform = window.Capacitor?.getPlatform() ?? ''

  //   setPlatform(platform)

  //   fetchAppInfo(isNativePlatform).catch(console.error)

  //   if (isNativePlatform) {
  //     registerAppUrlOpen().catch(console.error)
  //     SplashScreen.hide().catch(console.error)
  //     // 1초 미만 불안정, 1초로 변경
  //     if (platform === 'android') {
  //       setTimeout(() => {
  //         void StatusBar.setStyle({ style: Style.Light })
  //       }, 1000)
  //     }
  //     Keyboard.addListener('keyboardWillShow', () => {
  //       setIsShowingKeyboard(true)
  //     }).catch(console.error)
  //     Keyboard.addListener('keyboardWillHide', () => {
  //       setIsShowingKeyboard(false)
  //     }).catch(console.error)
  //   } else {
  //     // safe area 0
  //     document.documentElement.style.setProperty('--safe-area-inset-top', '0px')
  //     document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px')
  //     document.documentElement.style.setProperty('--safe-area-inset-left', '0px')
  //     document.documentElement.style.setProperty('--safe-area-inset-right', '0px')
  //   }

  //   return () => {
  //     if (isNativePlatform) {
  //       Keyboard.removeAllListeners().catch(console.error)
  //     }
  //   }
  // }, [])

  // 뒤로 버튼 처리
  // useEffect(() => {
  //   const isNativePlatform = window.Capacitor?.isNativePlatform() ?? false
  //   if (isNativePlatform) {
  //     registerDeviceBack().catch(console.error)
  //   }
  // }, [registerDeviceBack])

  // 디바이스 등록
  // useEffect(() => {
  //   const isNativePlatform = window.Capacitor?.isNativePlatform() ?? false
  //   if (isNativePlatform) {
  //     registerDevice().catch(console.error)
  //   }
  // }, [registerDevice])

  return (
    <>
      {!env.isProd() && (
        <div className="fixed top-0 z-999 mt-safe text-[#ff0000] font-black text-text_10_15">
          <h1>
            {env.app.env} v.{env.app.buildVersion} / 개발환경
          </h1>
        </div>
      )}
      {children}
    </>
  )
}

export default MaintenanceProvider
