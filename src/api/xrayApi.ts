import { api } from '@/api/client'

export const uploadAndInfer = async (imageFile: File) => {
  try {
    const response = await api.xray.xrayControllerInfer(
      { file: imageFile },
      {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          authRequired: false,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('API 전송 실패:', error)
    return null
  }
}
