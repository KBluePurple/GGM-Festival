<script lang="ts">
    import QRCode from 'qrcode';
    import {onMount} from "svelte";

    onMount(() => {
        const canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, '천승현', function (error) {
            if (error) console.error(error)
        });
    });
</script>

<main>
    <canvas id="qrcode"></canvas>
</main>

<style>

</style>