<script lang="ts">
    import QrScanner from 'qr-scanner';
    import {onMount} from "svelte"

    export let onScan: (result: string) => void;
    let data: string = "";

    onMount(async () => {
        const video = document.getElementById('qr-video') as HTMLVideoElement;
        const customDiv = document.getElementById('qr-custom') as HTMLDivElement;

        const qrScanner = new QrScanner(video, (result: QrScanner.ScanResult) => onScanEvent(result), {
            fps: 60,
            contrast: 0.5,
            brightness: 0.5,
            autoBrightnessValue: false,
            highlightScanRegion: true,
            maxScansPerSecond: 1,
            overlay: customDiv
        });

        function onScanEvent(result: QrScanner.ScanResult) {
            qrScanner.stop();
            onScan(result.data);
        }

        const cameras = await QrScanner.listCameras();

        let cameraId: string | undefined = undefined;

        cameras.find((camera) => {
            if (camera.label.includes('back')) {
                cameraId = camera.id;
                return true;
            }
        });

        await qrScanner.setCamera(cameraId ?? cameras[0].id);
        await qrScanner.start()

        onScan = (result: string) => {
            data = result;
            video.style.opacity = "0";
        }

        return () => {
            qrScanner.stop();
        }
    });
</script>

<main>
    <video id="qr-video" width="350" height="350"></video>
    <div id="qr-custom"></div>
    <p>{data}</p>
</main>

<style>
    main {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #qr-video {
        margin-top: 100px;
        object-fit: cover;
        object-position: center;
        transition: all 0.5s;
    }

    #qr-custom {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        outline: #ffffff dotted 2px;
        mix-blend-mode: difference;
        background-blend-mode: revert;
        border-radius: 10px;
    }
</style>
