import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Activity, Globe2, MapPin, Radio, Award, BarChart3, Upload, Zap, List, Layers, Rss, FileUp, Map as MapIcon } from 'lucide-react';

// ==========================================
// 1. DATOS DE USUARIO PRE-CARGADOS
// (Utilizando el log POTA AR-0175 provisto)
// ==========================================
const DEFAULT_ADIF = `
<ADIF_VER:5>3.1.4
<PROGRAMID:11>ADIF Master
<PROGRAMVERSION:3>3.6
<EOH>

<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>100 <QSO_DATE:8>20260531 <ITUZ:2>14 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:6>GF07vm <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.134 <MY_CQ_ZONE:2>13 <TIME_ON:4>1740 <QTH:25>CONCEPCION DEL URUGUAY ER <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:6>LU4JRM <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>N <RST_RCVD:2>59 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1740 <RST_SENT:2>59 <MODE:3>SSB <CQZ:2>13 <APP_QRZLOG_LOGID:10>1459851755 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.134 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:17>lu5jb@hotmail.com <NAME:52>CENTRO DE COMUNICACIONES FIJO CONCEPCION DEL URUGUAY <LAT:11>S032 29.759 <EQSL_QSL_SENT:1>N <COUNTRY:9>Argentina <LON:11>W058 14.594 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:3>227 <EOR>
<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>100 <QSO_DATE:8>20260531 <ITUZ:2>14 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:6>GF05tc <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.085 <MY_CQ_ZONE:2>13 <TIME_ON:4>1743 <QTH:8>guernica <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:6>LU2DIG <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>N <RST_RCVD:2>59 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1743 <RST_SENT:2>59 <MODE:3>SSB <CQZ:2>13 <APP_QRZLOG_LOGID:10>1459852417 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.085 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:27>lu2deltaindiagolf@gmail.com <NAME:14>Fernando Borda <LAT:11>S034 54.960 <EQSL_QSL_SENT:1>N <COUNTRY:9>Argentina <LON:11>W058 22.127 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:2>43 <EOR>
<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>100 <QSO_DATE:8>20260531 <ITUZ:2>13 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:4>FF78 <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.065 <MY_CQ_ZONE:2>13 <TIME_ON:4>1749 <QTH:26>Camino a cañada larga s/n <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:6>LU6HPA <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>N <RST_RCVD:2>59 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1749 <RST_SENT:2>59 <MODE:3>SSB <CQZ:2>14 <APP_QRZLOG_LOGID:10>1459853609 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.065 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:22>pabloalu6hpa@gmail.com <NAME:19>ALBELO PABLO ANDRES <LAT:11>S031 30.000 <EQSL_QSL_SENT:1>N <COUNTRY:9>Argentina <LON:11>W065 00.000 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:3>697 <QSL_VIA:18>73 cordiales Pablo <EOR>
<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>100 <QSO_DATE:8>20260531 <ITUZ:2>13 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:4>FF78 <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.065 <MY_CQ_ZONE:2>13 <TIME_ON:4>1750 <QTH:12>MINA CLAVERO <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:6>LU2HDT <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>C <RST_RCVD:2>59 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1750 <RST_SENT:2>59 <MODE:3>SSB <CQZ:2>14 <APP_QRZLOG_LOGID:10>1459854248 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.065 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:21>LU2HDTLUCAS@gmail.com <NAME:22>LUCAS MATIAS QUIÑONES <LAT:11>S031 30.000 <EQSL_QSL_SENT:1>N <COUNTRY:9>Argentina <LON:11>W065 00.000 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:3>697 <QSL_VIA:40>LU2HDT LUCAS MINA CLAVERO , 73 CORDIALES <APP_QRZLOG_QSLDATE:8>20260601 <IOTA:4>none <EOR>
<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>144 <QSO_DATE:8>20260531 <ITUZ:2>14 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:6>GF26rn <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.065 <MY_CQ_ZONE:2>13 <TIME_ON:4>1751 <QTH:14>José p Varela <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:5>CX1SI <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>C <RST_RCVD:2>59 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1751 <RST_SENT:2>59 <MODE:3>SSB <CQZ:2>13 <APP_QRZLOG_LOGID:10>1459854413 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.065 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:17>cx1sicw@gmail.com <NAME:20>JORGE NESTOR IBAÑEZ <LAT:11>S033 27.486 <EQSL_QSL_SENT:1>N <COUNTRY:7>Uruguay <LON:11>W054 31.525 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:3>382 <QSL_VIA:29>DIRECT WITH 2 SASE OR $ 2 USA <APP_QRZLOG_QSLDATE:8>20260601 <EOR>
<QRZCOM_QSO_DOWNLOAD_STATUS:1>Y <BAND:3>40m <STATION_CALLSIGN:8>LW8EUA/A <DXCC:3>112 <QSO_DATE:8>20260531 <ITUZ:2>14 <LOTW_QSL_SENT:1>N <CONT:2>SA <GRIDSQUARE:6>FF46rk <TX_PWR:1>5 <COMMENT:23>ACTIVACION POTA AR-0175 <SIG_INFO:4>POTA <MY_SIG_INFO:7>AR-0175 <FREQ_RX:5>7.065 <MY_CQ_ZONE:2>13 <TIME_ON:4>1802 <QTH:8>Santiago <MY_CITY:4>CABA <LOTW_QSL_RCVD:1>N <MY_COUNTRY:9>Argentina <QRZCOM_QSO_UPLOAD_DATE:8>20260601 <CALL:6>CE3FZL <BAND_RX:3>40m <MY_NAME:13>Diego Mezzini <QSL_SENT:1>N <QSO_DATE_OFF:8>20260531 <QSL_RCVD:1>N <APP_QRZLOG_STATUS:1>C <RST_RCVD:2>43 <MY_ITU_ZONE:2>14 <EQSL_QSL_RCVD:1>N <TIME_OFF:4>1802 <RST_SENT:2>33 <MODE:3>SSB <CQZ:2>12 <APP_QRZLOG_LOGID:10>1459856894 <QRZCOM_QSO_DOWNLOAD_DATE:8>20260601 <FREQ:5>7.065 <MY_LON:11>W058 27.614 <QRZCOM_QSO_UPLOAD_STATUS:1>Y <EMAIL:18>diexista@gmail.com <NAME:12>Hector Frias <LAT:11>S033 33.750 <EQSL_QSL_SENT:1>N <COUNTRY:5>Chile <LON:11>W070 32.520 <MY_LAT:11>S034 31.929 <MY_STATE:2>BA <MY_GRIDSQUARE:6>GF05rj <DISTANCE:4>1118 <QSL_VIA:11>ONLY BUREAU <APP_QRZLOG_QSLDATE:8>20260601 <EOR>
`;

const ORIGIN_LAT = -34.53; // CABA
const ORIGIN_LON = -58.46; // CABA

// ==========================================
// 2. PARSER ADIF AVANZADO
// ==========================================
function parseAdifCoord(adifCoord) {
  if (!adifCoord) return null;
  try {
    const dir = adifCoord.charAt(0).toUpperCase();
    const degStr = adifCoord.substring(1, 4);
    const minStr = adifCoord.substring(5);
    const deg = parseFloat(degStr);
    const min = parseFloat(minStr);
    if (isNaN(deg) || isNaN(min)) return null;

    let dec = deg + (min / 60);
    if (dir === 'S' || dir === 'W') dec = -dec;
    return dec;
  } catch (e) {
    return null;
  }
}

function parseAdif(rawText) {
  const qsos = [];
  const records = rawText.toLowerCase().split('<eor>');
  
  records.forEach(rec => {
    if (rec.trim() === '') return;
    const qso = {};
    const regex = /<([a-z_]+):(\d+)[^>]*>([\s\S]*?)(?=<[a-z_]+:|$)/g;
    let m;
    while ((m = regex.exec(rec)) !== null) {
      const key = m[1].toUpperCase();
      const len = parseInt(m[2], 10);
      const val = m[3].substring(0, len).trim();
      qso[key] = val;
    }
    
    if (qso.CALL) {
      if (qso.LAT) qso.DEC_LAT = parseAdifCoord(qso.LAT);
      if (qso.LON) qso.DEC_LON = parseAdifCoord(qso.LON);
      
      if (qso.QSO_DATE) {
          qso.F_DATE = `${qso.QSO_DATE.substring(0,4)}-${qso.QSO_DATE.substring(4,6)}-${qso.QSO_DATE.substring(6,8)}`;
      }
      if (qso.TIME_ON) {
          qso.F_TIME = `${qso.TIME_ON.substring(0,2)}:${qso.TIME_ON.substring(2,4)}`;
      }

      qsos.push(qso);
    }
  });
  return qsos;
}

// ==========================================
// 3. COMPONENTE 3D NATIVO (ESTILO GLOBE.GL / AIRLINE ROUTES)
// ==========================================

const GEO_LABELS = [
    // Países de Referencia (DX)
    { text: "ARGENTINA", lat: -34.0, lon: -64.0, type: "country" },
    { text: "URUGUAY", lat: -32.52, lon: -55.76, type: "country" },
    { text: "CHILE", lat: -35.67, lon: -71.54, type: "country" },
    { text: "BRASIL", lat: -14.23, lon: -51.92, type: "country" },
    { text: "PARAGUAY", lat: -23.44, lon: -58.44, type: "country" },
    { text: "BOLIVIA", lat: -16.29, lon: -63.58, type: "country" },
    { text: "PERÚ", lat: -9.19, lon: -75.01, type: "country" },
    { text: "EE.UU.", lat: 39.82, lon: -98.57, type: "country" },
    { text: "ESPAÑA", lat: 40.46, lon: -3.75, type: "country" },
    { text: "JAPÓN", lat: 36.20, lon: 138.25, type: "country" },
    { text: "SUDÁFRICA", lat: -30.55, lon: 22.93, type: "country" },
    { text: "AUSTRALIA", lat: -25.27, lon: 133.77, type: "country" },
    
    // Provincias de Argentina (Contexto Local)
    { text: "Buenos Aires", lat: -36.5, lon: -60.0, type: "province" },
    { text: "Córdoba", lat: -31.5, lon: -64.5, type: "province" },
    { text: "Santa Fe", lat: -30.5, lon: -60.5, type: "province" },
    { text: "Mendoza", lat: -34.5, lon: -68.5, type: "province" },
    { text: "Entre Ríos", lat: -32.0, lon: -59.0, type: "province" },
    { text: "La Pampa", lat: -37.0, lon: -65.0, type: "province" },
    { text: "Tucumán", lat: -26.8, lon: -65.2, type: "province" },
    { text: "Salta", lat: -24.8, lon: -65.4, type: "province" },
    { text: "Chubut", lat: -43.3, lon: -65.1, type: "province" },
    { text: "Neuquén", lat: -38.9, lon: -70.0, type: "province" },
    { text: "Río Negro", lat: -40.8, lon: -66.0, type: "province" },
    { text: "Santa Cruz", lat: -48.8, lon: -69.9, type: "province" },
    { text: "Corrientes", lat: -28.8, lon: -58.0, type: "province" },
    { text: "Misiones", lat: -26.9, lon: -54.5, type: "province" }
];

const AirlineGlobe = ({ logs, mapTheme, showGeoLabels }) => {
  const mountRef = useRef(null);
  const labelsContainerRef = useRef(null);
  const geoLabelsContainerRef = useRef(null);
  const [labelsData, setLabelsData] = useState([]);
  
  // Referencias para actualizar la textura sin recrear la escena
  const earthMatRef = useRef(null);

  // Efecto para cambiar la textura cuando cambia mapTheme
  useEffect(() => {
    if (earthMatRef.current) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            mapTheme,
            (tex) => { 
                earthMatRef.current.map = tex; 
                earthMatRef.current.needsUpdate = true; 
            }
        );
    }
  }, [mapTheme]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensiones
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Escena, Cámara y Renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Slate 950 base
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Contenedor principal que rotará
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 100;

    // Luces para resaltar la esfera
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Un poco más de luz base
    scene.add(ambientLight);
    
    const dLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight); // La luz sigue a la cámara
    scene.add(camera);

    // --- LA TIERRA ---
    const earthGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x000000,
      specular: 0x222222,
      shininess: 15,
    });
    earthMatRef.current = earthMat; // Guardamos la referencia
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(mapTheme, (tex) => { 
        earthMat.map = tex; 
        earthMat.needsUpdate = true; 
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Halo atmosférico (Efecto sutil)
    const haloGeo = new THREE.SphereGeometry(RADIUS * 1.05, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    globeGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // Utilidad: Lat/Lon a coordenadas 3D
    const getCoordinates = (lat, lng, alt = 0) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = RADIUS * (1 + alt);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        (r * Math.cos(phi)),
        (r * Math.sin(phi) * Math.sin(theta))
      );
    };

    // --- GENERACIÓN DE ARCOS (RUTAS) Y PARTÍCULAS ANIMADAS ---
    const originVec = getCoordinates(ORIGIN_LAT, ORIGIN_LON);
    const animatedPoints = [];
    const radioPulses = [];
    const labels = [];

    // Función para crear estaciones con ondas de radio (Ripples)
    const createStation = (pos, colorHex, isOrigin) => {
        // Núcleo brillante
        const coreMat = new THREE.MeshBasicMaterial({ color: colorHex });
        const core = new THREE.Mesh(new THREE.SphereGeometry(isOrigin ? 0.7 : 0.4, 16, 16), coreMat);
        core.position.copy(pos);
        globeGroup.add(core);

        // Halo/Resplandor aditivo
        const glowMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
        const glow = new THREE.Mesh(new THREE.SphereGeometry(isOrigin ? 1.8 : 1.2, 16, 16), glowMat);
        glow.position.copy(pos);
        globeGroup.add(glow);

        // Onda de radio (Anillo expansivo)
        const ringGeo = new THREE.RingGeometry(isOrigin ? 0.8 : 0.4, isOrigin ? 1.0 : 0.6, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0,0,0)); // Alinear plano a la superficie de la esfera
        globeGroup.add(ring);

        // Guardar para la animación de pulso
        radioPulses.push({ mesh: ring, progress: Math.random(), speed: 0.015, isOrigin });
    };

    // Crear Origen (Color Cian)
    createStation(originVec, 0x06b6d4, true); 
    labels.push({ pos: originVec.clone(), text: "LW8EUA", type: "origin" });

    // Iterar Logs para crear conexiones
    logs.forEach((log, index) => {
        if(log.DEC_LAT === undefined || log.DEC_LON === undefined) return;
        
        const destVec = getCoordinates(log.DEC_LAT, log.DEC_LON);
        const distance = originVec.distanceTo(destVec);
        
        // Destino (Color Ambar)
        createStation(destVec, 0xf59e0b, false);
        labels.push({ pos: destVec.clone(), text: log.CALL, type: "dest" });

        // Altura del arco basada en distancia
        const maxHeight = distance * 0.25;
        
        // Calcular punto medio elevado
        const midPoint = originVec.clone().lerp(destVec, 0.5);
        midPoint.normalize().multiplyScalar(RADIUS + maxHeight);

        // Curva Bezier
        const curve = new THREE.QuadraticBezierCurve3(originVec, midPoint, destVec);
        
        // Dibujar trazo base del arco (muy tenue)
        const curvePoints = curve.getPoints(50);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        
        let arcColor = 0x38bdf8; // SSB Blue
        if (log.MODE === 'CW') arcColor = 0xc084fc; // CW Purple
        if (log.MODE === 'FT8' || log.MODE === 'DIGI') arcColor = 0xf472b6; // Digi Pink

        const lineMat = new THREE.LineBasicMaterial({
            color: arcColor,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        globeGroup.add(new THREE.Line(lineGeo, lineMat));

        // Crear "Dash" (rastro) animado estilo globe.gl
        const dashGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const dashMat = new THREE.LineBasicMaterial({
            color: arcColor,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending
        });
        const dashLine = new THREE.Line(dashGeo, dashMat);
        dashGeo.setDrawRange(0, 0); // Inicia oculto
        globeGroup.add(dashLine);

        // Guardar para el loop de animación
        animatedPoints.push({
            geo: dashGeo,
            pointsCount: 50,
            progress: Math.random(), 
            speed: 0.002 + (150 / Math.max(distance, 100)) * 0.003 
        });
    });

    setLabelsData(labels);

    // --- CONTROLES DE CAMARA Y ROTACION ---
    globeGroup.rotation.y = -Math.PI / 4; 
    globeGroup.rotation.x = Math.PI / 8;

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let lastInteractionTime = 0; 

    const onMouseDown = (e) => { 
        isDragging = true; 
        lastInteractionTime = Date.now();
    };
    const onMouseUp = () => { 
        isDragging = false; 
        lastInteractionTime = Date.now();
    };
    const onMouseMove = (e) => {
        if(isDragging) {
            const deltaX = e.clientX - prevMouse.x;
            const deltaY = e.clientY - prevMouse.y;
            globeGroup.rotation.y += deltaX * 0.005;
            globeGroup.rotation.x += deltaY * 0.005;
            lastInteractionTime = Date.now();
        }
        prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e) => {
        camera.position.z += e.deltaY * 0.5;
        camera.position.z = Math.max(150, Math.min(camera.position.z, 600)); 
        lastInteractionTime = Date.now();
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    canvasDom.addEventListener('wheel', onWheel, { passive: true });

    // --- BUCLE DE ANIMACIÓN ---
    const tempV = new THREE.Vector3();
    const animate = () => {
        requestAnimationFrame(animate);

        if (!isDragging && (Date.now() - lastInteractionTime > 3000)) {
            globeGroup.rotation.y -= 0.0005;
        }

        radioPulses.forEach(p => {
            p.progress += p.speed;
            if (p.progress >= 1) p.progress = 0; 
            const scale = p.isOrigin ? 1 + (p.progress * 3) : 1 + (p.progress * 2.5);
            p.mesh.scale.set(scale, scale, scale);
            p.mesh.material.opacity = 1 - p.progress; 
        });

        animatedPoints.forEach(p => {
            p.progress += p.speed;
            if (p.progress >= 1.2) p.progress = -0.2; 
            const dashLength = 12; 
            const startPoint = Math.floor(p.progress * p.pointsCount);
            p.geo.setDrawRange(Math.max(0, startPoint), dashLength);
        });

        renderer.render(scene, camera);

        if (labelsContainerRef.current) {
            const labelNodes = labelsContainerRef.current.children;
            labels.forEach((label, i) => {
                const node = labelNodes[i];
                if (!node) return;

                tempV.copy(label.pos);
                globeGroup.localToWorld(tempV);

                const dot = tempV.clone().normalize().dot(camera.position.clone().normalize());
                
                if (dot < 0.2) {
                    node.style.display = 'none'; 
                } else {
                    tempV.project(camera);
                    const x = (tempV.x * 0.5 + 0.5) * width;
                    const y = (-(tempV.y * 0.5) + 0.5) * height;
                    
                    node.style.display = 'block';
                    node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                }
            });
        }

        if (showGeoLabels && geoLabelsContainerRef.current) {
            const geoNodes = geoLabelsContainerRef.current.children;
            GEO_LABELS.forEach((lbl, i) => {
                const node = geoNodes[i];
                if (!node) return;

                const vec = getCoordinates(lbl.lat, lbl.lon);
                tempV.copy(vec);
                globeGroup.localToWorld(tempV);

                const dot = tempV.clone().normalize().dot(camera.position.clone().normalize());
                
                if (dot < 0.2) {
                    node.style.display = 'none'; 
                } else {
                    tempV.project(camera);
                    const x = (tempV.x * 0.5 + 0.5) * width;
                    const y = (-(tempV.y * 0.5) + 0.5) * height;
                    
                    node.style.display = 'block';
                    node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                }
            });
        }
    };
    animate();

    const onResize = () => {
        if(!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
        window.removeEventListener('resize', onResize);
        canvasDom.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
        canvasDom.removeEventListener('wheel', onWheel);
        mountRef.current?.removeChild(renderer.domElement);
    };
  }, [logs]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800">
        <div ref={mountRef} className="w-full h-full cursor-move" />
        
        {/* Capa de Etiquetas HTML Proyectadas */}
        <div ref={labelsContainerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {labelsData.map((lbl, idx) => (
                <div 
                    key={idx} 
                    className={`absolute top-0 left-0 transition-opacity duration-100 flex items-center gap-1.5`}
                    style={{ willChange: 'transform' }}
                >
                    <div className={`w-6 h-[1px] ${lbl.type === 'origin' ? 'bg-cyan-500/80 shadow-[0_0_5px_#06b6d4]' : 'bg-amber-500/80 shadow-[0_0_5px_#f59e0b]'}`}></div>
                    <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md border uppercase tracking-widest ${
                        lbl.type === 'origin' 
                        ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                        : 'bg-amber-950/70 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    }`}>
                        {lbl.text}
                    </div>
                </div>
            ))}
        </div>

        {/* Capa de Etiquetas Geograficas (Paises/Provincias) */}
        <div ref={geoLabelsContainerRef} className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 ${showGeoLabels ? 'opacity-100' : 'opacity-0'}`}>
            {GEO_LABELS.map((lbl, idx) => (
                <div 
                    key={idx} 
                    className="absolute top-0 left-0 transition-opacity duration-100 text-center pointer-events-none"
                    style={{ willChange: 'transform' }}
                >
                    <div className={lbl.type === 'country' 
                        ? 'text-[11px] font-black uppercase tracking-[0.2em] text-slate-300/40 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]'
                        : 'text-[9px] font-semibold text-slate-400/50 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]'
                    }>
                        {lbl.text}
                    </div>
                </div>
            ))}
        </div>

        {/* Leyenda Visual */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-slate-700 text-xs text-slate-300 shadow-xl pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
                <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </div> Origen (LW8EUA)
            </div>
            <div className="flex items-center gap-2 mb-1">
                <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </div> Corresponsales
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700">
                <div className="w-3 h-0.5 bg-sky-500 shadow-[0_0_5px_#0ea5e9]"></div> SSB
                <div className="w-3 h-0.5 bg-pink-400 shadow-[0_0_5px_#f472b6] ml-2"></div> DIGI
                <div className="w-3 h-0.5 bg-purple-400 shadow-[0_0_5px_#c084fc] ml-2"></div> CW
            </div>
        </div>
        <div className="absolute bottom-4 left-4 z-10 text-slate-500 text-[10px] pointer-events-none uppercase tracking-widest font-semibold">
            Tráfico RF Ionosférico - {logs.length} QSOs
        </div>
    </div>
  );
};

// ==========================================
// 4. COMPONENTE PRINCIPAL (UI GENERAL)
// ==========================================
export default function App() {
  const [adifInput, setAdifInput] = useState(DEFAULT_ADIF);
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGeoLabels, setShowGeoLabels] = useState(true);
  
  // Opciones de texturas para el globo
  const MAP_THEMES = {
      dark: 'https://unpkg.com/three-globe/example/img/earth-dark.jpg',
      blueMarble: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      day: 'https://unpkg.com/three-globe/example/img/earth-day.jpg',
      night: 'https://unpkg.com/three-globe/example/img/earth-night.jpg'
  };
  const [currentMapTheme, setCurrentMapTheme] = useState(MAP_THEMES.dark);

  useEffect(() => {
    setLogs(parseAdif(DEFAULT_ADIF));
  }, []);

  const handleUpdate = () => {
    setLogs(parseAdif(adifInput));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      setAdifInput(text);
      setLogs(parseAdif(text));
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const stats = useMemo(() => {
    const totalQSOs = logs.length;
    const countries = new Set(logs.map(l => l.COUNTRY).filter(Boolean));
    let maxDist = 0;
    
    logs.forEach(log => {
      if (log.DISTANCE) {
        const d = parseInt(log.DISTANCE, 10);
        if (d > maxDist) maxDist = d;
      }
    });

    return { 
        totalQSOs, 
        totalCountries: countries.size, 
        maxDist
    };
  }, [logs]);

  // Filtrado de Logs para la tabla
  const filteredLogs = logs.filter(log => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
          log.CALL?.toLowerCase().includes(term) ||
          log.COUNTRY?.toLowerCase().includes(term) ||
          log.GRIDSQUARE?.toLowerCase().includes(term)
      );
  });

  // Ayudante de colores para las etiquetas de modos en la tabla
  const getModeColor = (mode) => {
      if (!mode) return 'bg-slate-700 text-slate-300 border-slate-600';
      if (mode.includes('SSB')) return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      if (mode.includes('CW')) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      return 'bg-pink-500/10 text-pink-400 border-pink-500/30'; // Digitales/FT8/etc
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 flex p-4 font-sans gap-4 selection:bg-sky-500/30 overflow-hidden">
      
      {/* PANEL IZQUIERDO */}
      <div className="w-[45%] flex flex-col gap-4 h-full">
        
        {/* Header Estación */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 flex-shrink-0 shadow-xl flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-sky-500/20">
                    <Radio className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-wide text-white drop-shadow-md">LW8EUA/A</h1>
                    <p className="text-sky-400 font-medium flex items-center gap-1 text-xs">
                        <MapPin className="w-3.5 h-3.5" /> GF05rj
                    </p>
                </div>
            </div>
            
            {/* Input Rápido */}
            <div className="flex gap-2">
                <label className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-sky-400" /> Archivo .ADI
                    <input type="file" accept=".adi,.adif,.txt" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 shadow-md">
            <div className="text-slate-400 text-[11px] mb-1 uppercase tracking-wider font-semibold">QSOs</div>
            <div className="text-xl font-bold text-white">{stats.totalQSOs}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 shadow-md">
            <div className="text-slate-400 text-[11px] mb-1 uppercase tracking-wider font-semibold">DXCC</div>
            <div className="text-xl font-bold text-sky-400">{stats.totalCountries}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 shadow-md">
            <div className="text-slate-400 text-[11px] mb-1 uppercase tracking-wider font-semibold">Dist. Max</div>
            <div className="text-xl font-bold text-emerald-400">{stats.maxDist}<span className="text-[10px] text-emerald-600 ml-1">KM</span></div>
          </div>
        </div>

        {/* Lista de Contactos Premium */}
        <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-sky-400" />
                    <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Logbook Activo</h2>
                </div>
                {/* Buscador Integrado */}
                <input 
                    type="text" 
                    placeholder="Buscar señal o país..." 
                    className="bg-slate-950 border border-slate-700 text-xs px-3 py-1.5 rounded-md focus:outline-none focus:border-sky-500 text-slate-300 w-48 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-[11px] text-left border-collapse">
                    <thead className="text-slate-400 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md shadow-sm">
                        <tr>
                            <th className="px-4 py-2.5 font-semibold uppercase tracking-wider border-b border-slate-700">Fecha / Hora</th>
                            <th className="px-4 py-2.5 font-semibold uppercase tracking-wider border-b border-slate-700">Callsign</th>
                            <th className="px-4 py-2.5 font-semibold uppercase tracking-wider border-b border-slate-700">Modo</th>
                            <th className="px-4 py-2.5 font-semibold uppercase tracking-wider border-b border-slate-700">RST</th>
                            <th className="px-4 py-2.5 font-semibold uppercase tracking-wider border-b border-slate-700 text-right">Dist / País</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filteredLogs.map((log, i) => (
                            <tr key={i} className="hover:bg-slate-800/60 transition-colors group">
                                <td className="px-4 py-2 text-slate-400 whitespace-nowrap">
                                    {log.F_DATE} <span className="text-slate-500 font-mono ml-1">{log.F_TIME}z</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="font-bold text-sky-100 group-hover:text-white transition-colors text-xs">{log.CALL}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${getModeColor(log.MODE)}`}>
                                            {log.MODE}
                                        </span>
                                        <span className="text-slate-500 font-mono">{log.BAND}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-mono text-slate-400">
                                    {log.RST_SENT && log.RST_RCVD ? `${log.RST_SENT}/${log.RST_RCVD}` : '-'}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <div className="text-slate-300 font-medium truncate max-w-[120px]" title={log.COUNTRY}>{log.COUNTRY}</div>
                                    <div className="text-slate-500 flex justify-end gap-1 font-mono text-[10px]">
                                        {log.GRIDSQUARE && <span>{log.GRIDSQUARE} •</span>}
                                        {log.DISTANCE ? `${log.DISTANCE}km` : ''}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredLogs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-slate-500 italic">
                                    No se encontraron contactos que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* PANEL DERECHO (MAPA CON SELECTOR) */}
      <div className="flex-1 h-full relative">
        {/* Selector de Mapas Superpuesto */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 shadow-xl">
            <button 
                onClick={() => setShowGeoLabels(!showGeoLabels)}
                className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${showGeoLabels ? 'bg-sky-500/20 text-sky-400' : 'bg-transparent text-slate-400 hover:text-slate-300'}`}
                title="Mostrar/Ocultar etiquetas geográficas"
            >
                <MapIcon className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-700 mx-1"></div>
            <Globe2 className="w-4 h-4 text-slate-400 ml-1" />
            <select 
                className="bg-transparent border-none text-xs text-slate-200 focus:ring-0 cursor-pointer pr-4 font-semibold uppercase tracking-wider outline-none"
                value={currentMapTheme}
                onChange={(e) => setCurrentMapTheme(e.target.value)}
            >
                <option value={MAP_THEMES.dark} className="bg-slate-900 text-slate-200">Tema Noche Oscura</option>
                <option value={MAP_THEMES.blueMarble} className="bg-slate-900 text-slate-200">Satelite Azul</option>
                <option value={MAP_THEMES.day} className="bg-slate-900 text-slate-200">Topologia Diurna</option>
                <option value={MAP_THEMES.night} className="bg-slate-900 text-slate-200">Ciudades Iluminadas</option>
            </select>
        </div>

        <AirlineGlobe logs={logs} mapTheme={currentMapTheme} showGeoLabels={showGeoLabels} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}
