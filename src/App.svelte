<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Footer from "./lib/Footer.svelte";
    import Manager from "./page/Manager.svelte";
    import Main from "./page/Main.svelte";
    import {SvelteToast} from '@zerodevx/svelte-toast';

    const options = {

    };
</script>

<main>
    <Header/>
    <div class="container">
        <Main/>
    </div>
    <Footer/>
    <SvelteToast {options} />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }

    .container {
        flex: 1;
        max-width: 100%;
    }
</style>
