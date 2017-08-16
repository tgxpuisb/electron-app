<template>
    <div class="album-slide-item">
        <el-button type="success" icon="picture" class="album-slide-refresh" @click="startAnimate"></el-button>

        <div
            class="album-slide-bg"
            :style="bg.style"
            v-for="bg in bgs"
        ></div>

        <img
            class="album-slide-element"
            :src="element.url"
            :style="element.style"
            v-for="element in elements"
            :class="element.aniClass"
        >

        <div
            class="album-slide-photo"
            :style="photo.style"
            v-for="photo in photos"
            :class="photo.aniClass"
        >
            <img
                :src="photo.border"
                v-if="photo.border"
                class="album-slide-photo-border"
                :style="photo.borderStyle"
            >
            <canvas :width="photo.w" :height="photo.h" ref="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                startAni: false
            }
        },
        props: ['slide'],
        computed: {
            bgs: function () {
                return this.slide.bgs.map(v => {
                    let style = {
                        'background': `${v.color ? v.color + ' ' : '#FFFFFF '}no-repeat center`,
                        'background-size': '100% 100%',
                        zindex: v.z
                    }
                    if (v.url) {
                        style['backgroundImage'] = `url(${v.url})`
                    }
                    return {
                        style
                    }
                })
            },
            elements: function () {
                return this.slide.elements.map(v => {
                    let style = {
                        width: v.w / 2 + 'px',
                        height: v.h / 2 + 'px',
                        left: v.x / 2 + 'px',
                        top: v.y / 2 + 'px',
                        zIndex: v.z
                    }
                    let obj = {}
                    if (v.ani) {
                        obj.ani = v.ani
                        obj.aniName = v.aniName
                        obj.aniClass = {
                            animated: false,
                        }
                        obj.aniClass['delay' + v.delay] = true
                        obj.aniClass['duration' + v.duration] = true
                        obj.aniClass[v.aniName] = false
                    }
                    return {
                        style,
                        url: v.url,
                        ...obj
                    }
                })
            },
            photos: function () {
                return this.slide.photos.map(v => {
                    let style = {
                        width: v.w / 2 + 'px',
                        height: v.h / 2 + 'px',
                        left: v.x / 2 + 'px',
                        top: v.y / 2 + 'px',
                        zIndex: v.z
                    }
                    let borderStyle = {
                        width: v.w / 2 + 'px',
                        height: v.h / 2 + 'px'
                    }
                    let obj = {}
                    if (v.ani) {
                        obj.aniName = v.aniName
                        obj.ani = v.ani
                        obj.aniClass = {
                            animated: false,
                        }
                        obj.aniClass['delay' + v.delay] = true
                        obj.aniClass['duration' + v.duration] = true
                        obj.aniClass[v.aniName] = false
                    }
                    return {
                        style,
                        url: v.url,
                        mask: v.mask,
                        border: v.border,
                        borderStyle,
                        w: v.w / 2,
                        h: v.h / 2,
                        ...obj
                    }
                })
            }
        },
        mounted () {
            this.drawCanvas()
        },
        methods: {
            drawCanvas () {
                this.slide.photos.forEach((v, index) => {
                    let ctx = this.$refs.canvas[index].getContext('2d')
                    this
                        .loadImage([v.url, v.mask])
                        .then(result => {
                            ctx.drawImage(result[0], v.dx / 2, v.dy / 2, v.dw / 2, v.dh / 2)
                            ctx.globalCompositeOperation = 'destination-in'
                            ctx.drawImage(result[1], 0, 0, v.w / 2, v.h / 2)
                        })
                })
            },
            loadImage (urls) {
                return Promise.all(urls.map(v => {
                    return new Promise((resolve, reject) => {
                        let img = new Image()
                        img.src = v
                        img.onload = () => {
                            resolve(img)
                        }
                        img.onerror = () => {
                            reject()
                        }
                    })
                }))
            },
            startAnimate () {
                this.drawCanvas()
                this.elements.forEach(v => {
                    if (v.ani) {
                        v.aniClass.animated = true
                        v.aniClass[v.aniName] = true
                    }
                })
                this.photos.forEach(v => {
                    if (v.ani) {
                        v.aniClass.animated = true
                        v.aniClass[v.aniName] = true
                    }
                })
                this.$forceUpdate()
                setTimeout(() => {
                    this.resetAnimate()
                }, 5000)
            },

            resetAnimate () {
                this.elements.forEach(v => {
                    if (v.ani) {
                        v.aniClass.animated = false
                        v.aniClass[v.aniName] = false
                    }
                })
                this.photos.forEach(v => {
                    if (v.ani) {
                        v.aniClass.animated = false
                        v.aniClass[v.aniName] = false
                    }
                })
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="less">
    .album-slide-item {
        position: relative;
        .delay(@count) when (@count <= 5){
            .delay-@{count}{
                -webkit-animation-delay: @count * 1s;
                animation-delay: @count * 1s;
            }
            .delay((@count + 1));
        }
        .delay(1);

        .duration(@count) when (@count <= 5){
            .duration-@{count}{
                -webkit-animation-duration: @count * 1s;
                animation-duration: @count * 1s;
            }
            .duration((@count + 1));
        }
        .duration(1);

        .album-slide-element,
        .album-slide-photo,
        .album-slide-photo-border {
            position: absolute;
            left: 0;
            top: 0;
        }

        .album-slide-photo-mask,
        .album-slide-photo-url {
            opacity: 0;
            visibility: hidden;
            width: 0;
            height: 0;
        }

        .album-slide-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
        }
        .album-slide-refresh {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9999;
        }
    }
</style>