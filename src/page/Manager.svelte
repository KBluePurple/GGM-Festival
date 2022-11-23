<script lang="ts">
    import {
        ContentSwitcher,
        Modal,
        NumberInput,
        RadioTile,
        Switch,
        TextArea,
        TileGroup
    } from "carbon-components-svelte";
    import IoIosReturnRight from "svelte-icons/io/IoIosReturnRight.svelte";
    import IoIosReturnLeft from "svelte-icons/io/IoIosReturnLeft.svelte";
    import type { Products } from "../data/data";
    import { Data } from "../data/data";
    import QrCodeScanner from "../lib/QrCodeScanner.svelte";
    import client from "../util/client";
    import { toast } from "@zerodevx/svelte-toast";

    let selectedIndex = 0;
    let selected = 0;

    let customAmount = 100;
    let customReason = "";

    let isQrModalOpened = false;

    let qrCodeScanner: QrCodeScanner;

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

    async function loadData() {
        try {
            if (!localStorage.getItem("userInfo")) {
                window.location.href = "#/login";
                let registerInfo = await client.post("/register", {username: "test"});
                localStorage.setItem("userInfo", JSON.stringify(registerInfo.data));
            }

            products = await Data.getProducts();
        } catch (e) {
            localStorage.removeItem("token");
            window.location.href = "#/login";
        }
    }

    async function provisionToken() {
        openQrModal();
    }

    async function takeToken(scanResult: string) {
        qrCodeScanner.pause();
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (selectedIndex === 0) {
                let amount = 0;
                let reason = "";

                if (selected !== products.buy.length) {
                    amount = products.buy[selected].price;
                    reason = products.buy[selected].name;
                }
                else {
                    amount = customAmount;
                    reason = customReason;
                }

                await client.post("/give", {
                    token: userInfo.token,
                    uuid: scanResult,
                    coins: amount,
                    reason
                });

                toast.push("토큰 지급 성공", {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(72,187,120,0.9)',
                        '--toastBarBackground': '#2F855A'
                    }
                });
            } else {
                let amount = 0;
                let reason = "";

                if (selected !== products.sell.length) {
                    amount = products.sell[selected].price;
                    reason = products.sell[selected].name;
                }
                else {
                    amount = customAmount;
                    reason = customReason;
                }

                await client.post("/take", {
                    token: userInfo.token,
                    uuid: scanResult,
                    coins: amount,
                    reason
                });

                toast.push("토큰 회수 성공", {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(72,187,120,0.9)',
                        '--toastBarBackground': '#2F855A'
                    }
                });
            }
        }
        catch (e) {
            toast.push(e.message, {
                theme: {
                    '--toastBackground': 'rgba(255, 0, 0, 0.8)',
                    '--toastColor': 'white',
                    '--toastBarBackground': 'rgba(255, 0, 0, 0.8)',
                }
            });
        }
        closeQrModal();
    }

    loadData();
</script>

<svelte:head>
    <title>Manager</title>
</svelte:head>

<main>
    <div class="flex items-center pb-5">
        <h3 class="flex-1">관리자 페이지</h3>
        <p class="text-sm flex-1 p-0 text-end">이름: {userInfo.username}</p>
    </div>
    <div id="switcher">
        <ContentSwitcher bind:selectedIndex>
            <Switch>
                <div style="display: flex; align-items: center;">
                    <div class="icon">
                        <IoIosReturnRight />
                    </div>
                    지급
                </div>
            </Switch>
            <Switch>
                <div style="display: flex; align-items: center;">
                    <div class="icon">
                        <IoIosReturnLeft />
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
                    <NumberInput hideSteppers label="토큰 수" bind:value={customAmount} class="mb-5" />
                    <TextArea label="사유" placeholder="사유를 입력하세요" bind:value={customReason} class="mb-5" />
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
            <div class="flex flex-col items-center justify-center h-full">
                <p>토큰을 지급할 유저의 QR 코드를 스캔해 주세요</p>
                <!--{#if isQrModalOpened}-->
                <QrCodeScanner bind:qrCodeScanner={qrCodeScanner} onScan={takeToken} />
                <!--{/if}-->
            </div>
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
                    <NumberInput hideSteppers label="토큰 수" value={customAmount} class="mb-5" />
                    <TextArea label="사유" placeholder="사유를 입력하세요" value={customReason} class="mb-5" />
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
            <div class="flex flex-col items-center justify-center h-full">
                <p>토큰을 회수할 유저의 QR 코드를 스캔해 주세요</p>
                <!--{#if isQrModalOpened}-->
                <QrCodeScanner bind:qrCodeScanner={qrCodeScanner} onScan={takeToken} />
                <!--{/if}-->
            </div>
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
