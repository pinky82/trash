import { useSystemInfo } from "@/hooks/useSystemInfo";
import { View } from "@tarojs/components";

export default function SafeView() {
    const systemInfo = useSystemInfo()
    const { safeArea, isMiniProgram } = systemInfo || {}
    console.log(safeArea)
    return (
        isMiniProgram && safeArea ?
            <View style={{ height: safeArea.bottom - safeArea.height }}>
            </View>
            :
            <></>
    )
}