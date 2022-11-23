<script lang="ts">
    import {onMount, onDestroy} from "svelte";
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

        let html5Qrcode: Html5Qrcode | undefined = undefined;

        async function onScanSuccess(qrCodeMessage: string) {
            onScan(qrCodeMessage)
        }

        qrCodeScanner.start = async () => {
            console.log("start");
            html5Qrcode = new Html5Qrcode("qr-reader");
            await html5Qrcode.start(
                cameras[cameraId].id,
                {fps: 10, qrbox: 200},
                qrCode => onScanSuccess(qrCode),
                () => {}
            );
        }

        qrCodeScanner.stop = async () => {
            if (html5Qrcode) {
                await html5Qrcode.stop();
            }
        }

        qrCodeScanner.pause = async () => {
            await html5Qrcode.pause();
        }
    });

    onDestroy(() => {
        qrCodeScanner.stop();
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
