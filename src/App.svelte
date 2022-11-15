<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Footer from "./lib/Footer.svelte";
    import Manager from "./page/Manager.svelte";
</script>

<main>
    <Header />
    <div class="container">
        <Manager />
    </div>
    <Footer />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .container {
        flex: 1;
    }
</style>
