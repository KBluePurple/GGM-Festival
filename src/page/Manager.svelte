<script lang="ts">
    import {ContentSwitcher, Modal, RadioTile, Switch, TextArea, TileGroup} from "carbon-components-svelte";
    import {NumberInput} from "carbon-components-svelte";
    import IoIosReturnRight from 'svelte-icons/io/IoIosReturnRight.svelte'
    import IoIosReturnLeft from 'svelte-icons/io/IoIosReturnLeft.svelte'
    import type {Products} from "../data/data";
    import {Data} from "../data/data";
    import QrCodeScanner from "../lib/QrCodeScanner.svelte";

    let selectedIndex = 0;
    let selected = 0;

    let isQrModalOpened = false

    let qrCodeScanner: QrCodeScanner;

    let onOpen = () => {
        qrCodeScanner.start();
    };
    let onClose = () => {
        qrCodeScanner.stop();
    };
    let onSubmit: () => void;

    function openQrModal() {
        isQrModalOpened = true;
    }

    function closeQrModal() {
        isQrModalOpened = false;
    }

    let products: Products | undefined = undefined;

    async function getProducts() {
        products = await Data.getProducts();
    }

    async function provisionToken() {
        openQrModal();
    }

    getProducts();
</script>

<svelte:head>
    <title>Manager</title>
</svelte:head>

<main>
    <div class="flex items-center pb-5">
        <h3 class="flex-1">관리자 페이지</h3>
        <p class="text-sm flex-1 p-0 text-end">이름: 유원석</p>
    </div>
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
        <p class="pb-5">대상에게 토큰을 지급합니다</p>
        {#if products}
            <TileGroup legend="빠른 선택" class="mb-5" bind:selected>
                {#each products.buy as product, index}
                    <RadioTile value={index}>{product.name} - {product.price}T</RadioTile>
                {/each}
                <RadioTile value="{products.buy.length}">사용자 지정</RadioTile>
            </TileGroup>
            {#if selected === products.buy.length}
                <div class="mb-5">
                    <NumberInput hideSteppers label="토큰 수" value={100} class="mb-5"/>
                    <TextArea label="사유" placeholder="사유를 입력하세요" class="mb-5"/>
                </div>
            {/if}
        {/if}
        <button class="btn" on:click={provisionToken}>토큰 지급</button>
        <Modal passiveModal
               bind:open={isQrModalOpened}
               on:open={onOpen}
               on:close={onClose}
               on:submit={onSubmit}
               modalHeading="토큰 지급"
               secondaryButtonText="취소"
               size="sm"
        >
            <p>토큰을 지급 할 유저의 QR 코드를 스캔해 주세요</p>
            <QrCodeScanner bind:qrCodeScanner={qrCodeScanner} onScan={closeQrModal}/>
        </Modal>
    {:else}
        <p class="pb-5">대상에게서 토큰을 회수합니다</p>
        {#if products}
            <TileGroup legend="빠른 선택" class="mb-5" bind:selected>
                {#each products.sell as product, index}
                    <RadioTile value={index}>{product.name} - {product.price}T</RadioTile>
                {/each}
                <RadioTile value="{products.sell.length}">사용자 지정</RadioTile>
            </TileGroup>
            {#if selected === products.sell.length}
                <div class="mb-5">
                    <NumberInput hideSteppers label="토큰 수" value={100} class="mb-5"/>
                    <TextArea label="사유" placeholder="사유를 입력하세요" class="mb-5"/>
                </div>
            {/if}
        {/if}
        <button class="btn" on:click={provisionToken}>토큰 회수</button>
        <Modal passiveModal
               bind:open={isQrModalOpened}
               on:open={onOpen}
               on:close={onClose}
               on:submit={onSubmit}
               modalHeading="토큰 회수"
               secondaryButtonText="취소"
               size="sm"
        >
            <p>토큰을 회수 할 유저의 QR 코드를 스캔해 주세요</p>
            <QrCodeScanner bind:qrCodeScanner={qrCodeScanner} onScan={closeQrModal}/>
        </Modal>
    {/if}
</main>

<style>
    main {
        padding: 20px;
    }

    #switcher {
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
