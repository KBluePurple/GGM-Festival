<script lang="ts">
    import QRCode from 'qrcode';
    import {onMount} from "svelte";

    onMount(() => {
        const canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, 'Token Value: 9834y938hgbv987y5gb932q87bv73876rtgv5g', {
            width: 100,
            margin: 2,
            color: {
                dark: '#1f1f1f',
                light: '#ffffff'
            }
        });
    });
</script>

<svelte:head>
    <title>GGM Club</title>
</svelte:head>

<main>
    <div id="event-info">
        <p class="sub-text">진행중인 이벤트</p>
        <p>팔씨름 대회</p>
        <img src="https://thumb.mtstarnews.com/06/2020/03/2020031011093864009_1.jpg/dims/optimize" alt="boxing-glove"
             width="100" height="100">
    </div>
    <div id="ranking">
        <p class="sub-text">실시간 랭킹</p>
        <table id="ranking-table">
            <tr>
                <th>순위</th>
                <th>이름</th>
                <th>GM Token</th>
            </tr>
            <tr>
                <td>1</td>
                <td>김철수</td>
                <td>100</td>
            </tr>
            <tr>
                <td>2</td>
                <td>이영희</td>
                <td>99</td>
            </tr>
            <tr>
                <td>3</td>
                <td>박철수</td>
                <td>98</td>
            </tr>
            <tr>
                <td>4</td>
                <td>최영희</td>
                <td>97</td>
            </tr>
            <tr>
                <td>5</td>
                <td>홍길동</td>
                <td>96</td>
            </tr>
        </table>
        <div id="hider"></div>
    </div>
    <div id="token-container">
        <p class="sub-text">다방면 활용이 가능한</p>
        <p>GM Token 잔액</p>
        <p id="token">100 T</p>
        <canvas id="qrcode"></canvas>
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

    #ranking-table {
        border-collapse: collapse;
        min-width: 300px;
        margin-top: 10px;
    }

    #ranking-table th, #ranking-table td {
        border-top: 1px solid #494949;
        border-bottom: 1px solid #494949;
        text-align: left;
        padding: 5px;
        font-size: 13px;
    }

    #ranking #hider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #1a1a1a 100%);
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
