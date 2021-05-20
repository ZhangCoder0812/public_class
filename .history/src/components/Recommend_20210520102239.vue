<template>
    <div class="recommendBox" v-if="hotData.length > 0">
        <h3>热门歌曲推荐</h3>
        <ul class="list">
            <li class="item" v-for="item in hotData" :key="item.id">
                <router-link :to="{ path: `/playsong/${item.id}` }">
                    <div class="pic">
                        <img :src="item.pic" alt />
                    </div>
                    <p v-text="item.title + '  ( ' + item.author + ' ) '"></p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hotData: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            let hotData = localStorage.getItem("hotData");
            if (hotData) {
                hotData = JSON.parse(hotData);
                // 时间没超过半小时 数据还有效 直接使用缓存
                if (new Date().getTime - hotData.time < 30 * 60 * 1000) {
                    this.hotData = hotData;
                    return;
                }
            }
            let result = await this.$api.hotlist();
            if (parseInt(result.code) === 0) {
                // 0 代表成功
                this.hotData = result.data;
                // 将结果存入缓存 记录存入时间
                localStorage.setItem(
                    "hotData",
                    JSON.stringify({
                        time: new Date().getTime(),
                        data: hotData,
                    })
                );
            }
        },
    },
    watch: {
        $route() {
            this.init();
        },
    },
};
</script>
<style lang="less">
.recommendBox {
    margin-top: 0.4rem;
    padding: 0 0.3rem;

    h3 {
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.32rem;
        font-weight: normal;
    }

    .list {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
            width: 32%;
            overflow: hidden;

            a {
                display: block;
                .pic {
                    height: 2.24rem;
                    background: #ddd;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }

                p {
                    height: 0.8rem;
                    line-height: 0.4rem;
                    font-size: 0.2rem;
                    color: grey;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
