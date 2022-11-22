<script lang="ts">
    import {onMount} from "svelte"
    import {Html5Qrcode, Html5QrcodeScanner} from "html5-qrcode";

    export let onScan: (result: string) => void
    export const qrCodeScanner = {
        start: () => {
        },
        stop: () => {
        },
        pause: () => {
        },
    }

    onMount(async () => {
        let cameraId = 0;
        const cameras = await Html5Qrcode.getCameras();

        cameras.forEach((camera, index) => {
            if (camera.label.includes("back")) {
                cameraId = index;
            }
        });

        let html5Qrcode = new Html5Qrcode("qr-reader");

        async function onScanSuccess(qrCodeMessage: string) {
            onScan(qrCodeMessage)
        }

        qrCodeScanner.start = async () => {
            await html5Qrcode.start(
                cameras[cameraId].id,
                {fps: 10, qrbox: 200},
                qrCode => onScanSuccess(qrCode),
                () => {}
            );
        }

        qrCodeScanner.stop = async () => {
            await html5Qrcode.stop();
        }

        qrCodeScanner.pause = async () => {
            await html5Qrcode.pause();
        }

        return () => {
            html5Qrcode.stop();
        }
    });
</script>

<main>
    <div id="qr-reader" class="mt-5"></div>
</main>

<style>
    #qr-reader {
        width: 100%;
        height: 100%;
    }
</style>
