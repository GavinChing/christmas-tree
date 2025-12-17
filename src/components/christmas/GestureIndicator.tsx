import { GestureType } from '@/types/christmas';
import { Hand, Grab, Circle, MousePointer, Camera, AlertCircle } from 'lucide-react';

interface GestureIndicatorProps {
  gesture: GestureType;
  isTracking: boolean;
  usingMouse: boolean;
  cameraPermission: 'prompt' | 'granted' | 'denied' | 'requesting';
  onRequestCamera: () => void;
}

const gestureIcons: Record<GestureType, React.ReactNode> = {
  none: <Circle className="w-5 h-5" />,
  fist: <Grab className="w-5 h-5" />,
  open: <Hand className="w-5 h-5" />,
  pinch: <MousePointer className="w-5 h-5" />,
  pointing: <MousePointer className="w-5 h-5" />,
};

const gestureLabels: Record<GestureType, string> = {
  none: '检测中...',
  fist: '握拳 - 圣诞树',
  open: '张开手掌 - 银河',
  pinch: '捏合 - 选择',
  pointing: '指向',
};

export function GestureIndicator({ 
  gesture, 
  isTracking, 
  usingMouse, 
  cameraPermission,
  onRequestCamera 
}: GestureIndicatorProps) {
  // Show camera permission prompt
  if (cameraPermission === 'prompt' || cameraPermission === 'requesting') {
    return (
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onRequestCamera}
          disabled={cameraPermission === 'requesting'}
          className="glass-gold rounded-xl px-4 py-3 flex items-center gap-3 text-foreground 
            hover:scale-105 active:scale-95 transition-all duration-300
            disabled:opacity-70 disabled:cursor-wait"
        >
          <div className="p-2 rounded-lg bg-christmas-gold/30 text-christmas-gold">
            <Camera className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">
              {cameraPermission === 'requesting' ? '正在请求权限...' : '启用手势控制'}
            </span>
            <span className="text-xs text-muted-foreground">
              点击授权摄像头
            </span>
          </div>
        </button>
      </div>
    );
  }

  // Show denied state
  if (cameraPermission === 'denied') {
    return (
      <div className="absolute top-4 left-4 z-10">
        <div className="glass-gold rounded-xl px-4 py-3 flex items-center gap-3 text-foreground">
          <div className="p-2 rounded-lg bg-christmas-red/30 text-christmas-red">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">摄像头权限被拒绝</span>
            <span className="text-xs text-muted-foreground">
              使用鼠标双击切换模式
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Normal gesture status display
  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="glass-gold rounded-xl px-4 py-3 flex items-center gap-3 text-foreground">
        <div className={`
          p-2 rounded-lg 
          ${isTracking 
            ? 'bg-christmas-green/30 text-christmas-snow' 
            : 'bg-muted/50 text-muted-foreground'
          }
          transition-colors duration-300
        `}>
          {usingMouse ? <MousePointer className="w-5 h-5" /> : gestureIcons[gesture]}
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {usingMouse ? '鼠标控制' : isTracking ? '手势已识别' : '等待手势'}
          </span>
          <span className="text-sm font-medium">
            {usingMouse ? '双击切换模式' : gestureLabels[gesture]}
          </span>
        </div>
        
        {isTracking && (
          <div className="w-2 h-2 rounded-full bg-christmas-green animate-pulse ml-2" />
        )}
      </div>
    </div>
  );
}
