/**
 * STUB: WebRTC para teleasistencia
 * 
 * Este archivo es un marcador de lugar arquitectónico.
 * La implementación real se hará en la feature `video-call`,
 * con librerías como simple-peer, socket.io y TURN/STUN servers.
 * 
 * NO USAR en producción. Solo para recordar la necesidad.
 * 
 * @module webrtc-stub
 * @see /src/features/video-call (implementación futura)
 */

/**
 * Función stub para inicialización de WebRTC
 * 
 * Esta función no hace nada real. Es solo un placeholder.
 * La implementación real incluirá:
 * - Configuración de TURN/STUN servers
 * - Gestión de conexiones peer-to-peer
 * - Manejo de streams de audio/video
 * - Señalización via WebSocket (socket.io)
 * - Gestión de permisos de medios
 * 
 * @returns {void}
 */
export const initWebRTC = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️ WebRTC stub: implementación pendiente en módulo video-call'
    );
  }
};

/**
 * Configuración stub para servidores STUN/TURN
 * 
 * En la implementación real, estos valores vendrán de variables de entorno
 * y se configurarán según el proveedor de infraestructura (Twilio, Agora, etc.)
 */
export const WEBRTC_CONFIG = {
  iceServers: [
    // Placeholder - reemplazar con servidores reales
    { urls: 'stun:stun.example.com:3478' },
  ],
} as const;

/**
 * Tipos stub para la futura implementación
 */
export interface WebRTCConnectionStub {
  id: string;
  status: 'pending' | 'connected' | 'disconnected';
  // Más propiedades se definirán en la feature real
}

/**
 * @deprecated Este es solo un stub. No usar en código de producción.
 */
export default {
  initWebRTC,
  WEBRTC_CONFIG,
};
