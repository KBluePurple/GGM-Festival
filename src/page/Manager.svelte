<script lang="ts">
    import QrCodeScanner from "../lib/QrCodeScanner.svelte";

    function onScan(data: string) {
        console.log(data);
    }
</script>

<main>
<!--    <QrCodeScanner onScan={onScan}/>-->
</main>

<style>

</style>
