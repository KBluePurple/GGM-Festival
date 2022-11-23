<script lang="ts">
    import {TextInput} from "carbon-components-svelte";
    import client from "../util/client";

    export let params = {} as any;

    let value = "";
    let error = "";

    console.log(params);

    async function submit() {
        try {
            const response = await client.post("/register", {username: value});

            localStorage.setItem("userInfo", JSON.stringify(response.data));
            window.location.href = "/#/" + params.redirect != null ? params.redirect : "";
        } catch (e) {
            error = e.message;
        }
    }
</script>

<div class="p-5">
    <TextInput bind:value placeholder="이름을 입력해 주세요"/>
    <button class="btn mt-5" on:click={submit}>회원가입</button>
    <p class="mt-5">{error}</p>
</div>

<style>
    .btn {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #ffffff;
        width: 100%;
        height: 50px;
    }

    .btn:focus, .btn:active {
        background-color: #f4f4f4;
        color: #000000;
    }
</style>