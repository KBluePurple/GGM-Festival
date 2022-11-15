<script lang="ts">
    import {ContentSwitcher, RadioTile, Switch, TextArea, TileGroup} from "carbon-components-svelte";
    import {NumberInput} from "carbon-components-svelte";
    import IoIosReturnRight from 'svelte-icons/io/IoIosReturnRight.svelte'
    import IoIosReturnLeft from 'svelte-icons/io/IoIosReturnLeft.svelte'

    let selectedIndex = 0;
    let selected = "0";
</script>

<svelte:head>
    <title>Manager</title>
</svelte:head>

<main>
    <div id="switcher">
        <ContentSwitcher bind:selectedIndex>
            <Switch>
                <div style="display: flex; align-items: center;">
                    <div class="icon">
                        <IoIosReturnRight/>
                    </div>
                    지급
                </div>
            </Switch>
            <Switch>
                <div style="display: flex; align-items: center;">
                    <div class="icon">
                        <IoIosReturnLeft/>
                    </div>
                    회수
                </div>
            </Switch>
        </ContentSwitcher>
    </div>

    {#if selectedIndex === 0}
        <p>대상에게 토큰을 지급합니다</p>
        <TileGroup legend="빠른 선택" class="mb-5" bind:selected>
            <RadioTile value="0" checked>복권 당첨 - 100 T</RadioTile>
            <RadioTile value="1">팔씨름 승리 - 200 T</RadioTile>
            <RadioTile value="2">사용자 지정</RadioTile>
        </TileGroup>

        {#if selected === "2"}
            <div class="mb-5">
                <NumberInput hideSteppers label="토큰 수" value={100} class="mb-5"/>
                <TextArea label="사유" placeholder="사유를 입력하세요" class="mb-5"/>
            </div>
        {/if}
        <button class="btn">토큰 지급</button>
    {:else}
        <p>대상에게서 토큰을 회수합니다</p>
        <TileGroup legend="빠른 선택" class="mb-5" bind:selected>
            <RadioTile value="0" checked>음료수 1잔 - 100T</RadioTile>
            <RadioTile value="1">과자 1컵 - 150T</RadioTile>
            <RadioTile value="2">사용자 지정</RadioTile>
        </TileGroup>

        {#if selected === "2"}
            <div class="mb-5">
                <NumberInput hideSteppers label="토큰 수" value={100} class="mb-5"/>
                <TextArea label="사유" placeholder="사유를 입력하세요" class="mb-5"/>
            </div>
        {/if}
        <button class="btn">토큰 회수</button>
    {/if}
</main>

<style>
    main {
        padding: 20px;
    }

    #switcher {
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }

    .icon {
        width: 20px;
        height: 20px;
        font-weight: 100;
        margin-right: 10px;
    }

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
