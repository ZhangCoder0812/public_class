<template>
    <div class="playBox">
        <div class="bg">
            <img :src="songDATA.pic" alt />
        </div>

        <!-- 热门推荐 -->
        <recommend></recommend>
    </div>
</template>

<script>
import Swiper from "swiper";
import Recommend from "../components/Recommend.vue";

export default {
  data() {
    return {
      lyricIndex: 0
    };
  },
  components: {
    Recommend
  },
  computed: {
    songDATA() {
      const { cur, list } = this.$store.state;
      return (
        list.find(item => {
          return parseInt(item.id) === cur;
        }) || null
      );
    }
  },
    components: { Recommend },
};
</script>

<style lang="less">
.playBox {
    position: relative;
    padding-top: 0.4rem;

    .content {
        padding: 0 0.4rem;
        .header {
            text-align: center;
            h2 {
                line-height: 0.56rem;
                font-size: 0.38rem;
                font-weight: normal;
            }
            p {
                line-height: 0.44rem;
                font-size: 0.32rem;
                color: grey;
            }
        }

        .lyric {
            margin-top: 0.2rem;
            height: 4.9rem;
            text-align: center;
            overflow: hidden;

            p {
                height: 0.6rem !important;
                line-height: 0.6rem;
                color: rgba(0, 0, 0, 0.7);
                font-size: 0.3rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                transition: 0.2s;

                &.active {
                    color: #22d59c;
                }
            }
        }

        .handle {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 1.5rem;

            i {
                margin: 0 0.3rem;
                width: 0.8rem;
                height: 0.8rem;
                border: 0.02rem solid rgba(0, 0, 0, 0.2);
                border-radius: 50%;

                &:nth-child(1) {
                    background: url("../assets/images/ttpodicon.svg") no-repeat center center;
                    background-size: 0.6rem 0.6rem;
                }

                &:nth-child(3) {
                    background: url("../assets/images/shoucang.svg") no-repeat 50% 52%;
                    background-size: 0.35rem 0.35rem;
                }

                &:nth-child(2) {
                    background: url("../assets/images/bofang.svg") no-repeat 58% center;
                    background-size: 0.45rem 0.45rem;

                    &.zanting {
                        background: url("../assets/images/zanting.svg") no-repeat center center;
                        background-size: 0.45rem 0.45rem;
                    }
                }
            }
        }
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        img {
            display: block;
            width: 100%;
            opacity: 0.04;
        }
    }
}
</style>
