<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Footer from "./lib/Footer.svelte";
    import Manager from "./page/Manager.svelte";
    import Main from "./page/Main.svelte";
</script>

<main>
    <Header/>
    <div class="container">
        <Main/>
    </div>
    <Footer/>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .container {
        flex: 1;
        width: 100vh;
    }
</style>
