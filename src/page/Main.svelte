<script lang="ts">
    import QRCode from 'qrcode';
    import {onMount} from "svelte";
    import type {EventData, RankingEntry} from "../data/data";
    import client from "../util/client";
    import {Modal, ToastNotification} from "carbon-components-svelte";

    let event: EventData | undefined = undefined;
    let ranking: RankingEntry[] = [];

    let isEventModalOpen = false;
    let isRankingModalOpen = false;

    async function loadData() {
        let response = await client.get('eventData.json');
        event = response.data;

        response = await client.get('rankingData.json');
        ranking = response.data;
    }

    onMount(async () => {
        const canvas = document.getElementById('qrcode');
        await QRCode.toCanvas(canvas, 'asd', {
            width: 150,
            margin: 2,
            color: {
                dark: '#1f1f1f',
                light: '#ffffff'
            }
        });
    });

    async function openRankingModal() {
        await loadData();
        isRankingModalOpen = true;
    }

    async function openEventModal() {
        await loadData();
        isEventModalOpen = true;
    }

    loadData();
</script>

<svelte:head>
    <title>GGM Club</title>
</svelte:head>

<main>
    {#if event}
        <div id="event-info" on:click={openEventModal}>
            <p class="sub-text">진행중인 이벤트</p>
            <p>{event.name}</p>
            <img src={event.image} alt="boxing-glove"
                 width="100" height="100">
        </div>

        <Modal passiveModal
               bind:open={isEventModalOpen}
               modalHeading={event.name}
        >
            <div class="event-modal">
                <img src={event.image} alt="boxing-glove"
                     width="100" height="100">
                <p>{event.description}</p>
            </div>
        </Modal>
    {/if}

    {#if ranking && ranking.length > 0}
        <div id="ranking" on:click={openRankingModal}>
            <p class="sub-text">실시간 랭킹</p>
            <table class="ranking-table">
                <tr>
                    <th>순위</th>
                    <th>이름</th>
                    <th>GM Token</th>
                </tr>
                {#each ranking.slice(0, 5) as entry, index}
                    <tr>
                        <td>{entry.rank}</td>
                        <td>{entry.name}</td>
                        <td>{entry.tokens}</td>
                    </tr>
                {/each}
            </table>
            <div id="hider"></div>
        </div>
        <Modal passiveModal
               bind:open={isRankingModalOpen}
               modalHeading="실시간 랭킹"
        >
            <div class="ranking-modal flex justify-center">
                <table class="ranking-table">
                    <tr>
                        <th>순위</th>
                        <th>이름</th>
                        <th>GM Token</th>
                    </tr>
                    {#each ranking as entry, index}
                        <tr>
                            <td>{entry.rank}</td>
                            <td>{entry.name}</td>
                            <td>{entry.tokens}</td>
                        </tr>
                    {/each}
                </table>
            </div>
        </Modal>
    {/if}
    <div id="token-container">
        <p class="sub-text">다방면 활용이 가능한</p>
        <p>GM Token 잔액</p>
        <p id="token">100 T</p>
        <canvas id="qrcode"></canvas>
    </div>

    <div class="absolute bottom-0 right-0 z-50">
        <ToastNotification
                kind="info"
                title="결제 성공"
                subtitle="100 T 결제가 성공적으로 완료되었습니다."
        />
    </div>
</main>

<style>
    #ranking {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0 20px 0;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    #event-info {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 150px;
        color: #ffffff;
    }

    #event-info p {
        margin: 0;
    }

    #event-info img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        object-position: center;
        opacity: 0.5;
        z-index: -5;
    }

    #ranking {
        position: relative;
        margin-top: 50px;
    }

    .ranking-table {
        border-collapse: collapse;
        min-width: 300px;
        margin-top: 10px;
    }

    .ranking-table th, .ranking-table td {
        border-top: 1px solid #494949;
        border-bottom: 1px solid #494949;
        text-align: center;
        padding: 5px;
        font-size: 13px;
    }

    #ranking #hider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #161616 100%);
    }

    p {
        font-size: 1.5rem;
        margin: 0;
    }

    .sub-text {
        font-size: 13px;
        margin: 2px;
        color: #c4c4c4;
    }

    #token-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #token {
        font-size: 3rem;
        font-weight: 100;
        text-align: center;
        margin: 0;
        padding-bottom: 1rem;
    }
</style>
