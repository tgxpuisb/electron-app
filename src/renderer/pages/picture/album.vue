<template>
    <div class="picture-album">
        <link rel="stylesheet" href="http://m.yuerbao.com/assets/libs/animate.css" type="text/css">
        <el-row class="album-base-container">
            <el-col :span="16">
                <el-form
                        ref="main-form"
                        class="album-form"
                        label-width="100px"
                        :model="mainConfig"
                >
                    <el-form-item label="影集名称">
                        <el-input v-model="mainConfig.albumName"></el-input>
                    </el-form-item>
                    <el-form-item label="影集显示简介">
                        <el-input type="textarea" v-model="mainConfig.desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-upload
                                action=""
                                class="upload-image"
                        >
                            <el-button size="small" type="primary">上传封面</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <img class="upload-image-preview" src="">
                    </el-col>
                    <el-col :span="8">
                        <el-upload
                                action=""
                                class="upload-image"
                        >
                            <el-button size="small" type="primary">上传镂空头像封面</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <img class="upload-image-preview" src="">
                    </el-col>
                    <el-col :span="8">
                        <el-upload
                                action=""
                                class="upload-image"
                        >
                            <el-button size="small" type="primary">选择音频</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传mp3文件，上传音频会被压缩</div>
                        </el-upload>
                        <el-time-select
                                placeholder="起始时间"
                                v-model="musicStart"
                                :editable="false"
                                :picker-options="{
                            start: '00:00',
                            step: '00:01',
                            end: '06:00'
                        }"
                                style="margin-bottom: 5px;"
                        >
                        </el-time-select>
                        <el-time-select
                                placeholder="结束时间"
                                v-model="musicEnd"
                                :editable="false"
                                :picker-options="{
                            start: '00:00',
                            step: '00:01',
                            end: '06:00'
                        }"
                                style="margin-bottom: 5px;"
                        >
                        </el-time-select>
                        <el-input placeholder="音乐链接">
                            <template slot="prepend">http://</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-upload
                        class="upload-psd"
                        drag
                        action=""
                        :before-upload="uploadPSD"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传PSD符合规则的文件，且不超过50M</div>
                </el-upload>
            </el-col>
            <el-button type="primary" @click="generateAlbumConfig">生成数据</el-button>
        </el-row>
        <section class="album-preview-list">
            <div class="album-preview-item" v-for="(slide, index) in album.slides">
                <album-preview class="album-preview-graph" :slide="slide">
                </album-preview>
                <ul class="album-preview-elements">
                    <li class="album-preview-element" v-for="(element, i) in slide.elements">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img :src="element.url">
                            </div>
                            <div style="padding: 14px;">
                                <p>元素图片</p>
                                <div class="bottom clearfix">
                                    <el-button type="text" @click="willEditElement('elements', index, i)">编辑</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <template v-for="(photo, i) in slide.photos">
                        <li class="album-preview-element">
                            <el-card :body-style="{ padding: '0px' }">
                                <div class="album-preview-image">
                                    <img :src="photo.url">
                                </div>
                                <div style="padding: 14px;">
                                    <p>头像-{{ i + 1 }}</p>
                                    <div class="bottom clearfix">
                                        <el-button type="text" @click="willEditElement('photos', index, i)">编辑</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </li>
                        <li class="album-preview-element">
                            <el-card :body-style="{ padding: '0px' }">
                                <div class="album-preview-image">
                                    <img :src="photo.mask">
                                </div>
                                <div style="padding: 14px;">
                                    <p>头像蒙版-{{ i + 1 }}</p>
                                    <div class="bottom clearfix">
                                        <el-button type="text" @click="willEditElement('photos', index, i)">编辑</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </li>
                    </template>

                    <li class="album-preview-element" v-for="(bg, i) in slide.bgs">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img :src="bg.url">
                            </div>
                            <div style="padding: 14px;">
                                <p>背景图</p>
                                <div class="bottom clearfix">
                                    <el-button type="text" @click="willEditElement('bgs', index, i)">编辑</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                </ul>
            </div>
        </section>

        <el-dialog title="修改配置" v-model="modalShow">
            <el-form :model="modalData" @close="closeEditModal">
                <template v-if="modalData.configType !== 'bgs'">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="宽度" label-width="80px">
                                <el-input-number v-model="modalData.w" :max="750"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="高度" label-width="80px">
                                <el-input-number v-model="modalData.h" :max="1206"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="距离左端距离(x)" label-width="80px">
                                <el-input-number v-model="modalData.x" :max="750"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="距离顶部距离(y)" label-width="80px">
                                <el-input-number v-model="modalData.y" :max="1206"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </template>

                <el-form-item label="层级" label-width="80px">
                    <el-input-number v-model="modalData.z"></el-input-number>
                </el-form-item>

                <template v-if="modalData.configType === 'photos'">
                    <el-row class="photos-edit-area">
                        <el-col :span="24" class="photos-edit-area-notice">
                            此区域内容请在开发指导下修改
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="dx" label-width="80px">
                                <el-input-number v-model="modalData.dx"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="dy" label-width="80px">
                                <el-input-number v-model="modalData.dy"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="dw" label-width="80px">
                                <el-input-number v-model="modalData.dw"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="dh" label-width="80px">
                                <el-input-number v-model="modalData.dh"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </template>
                <el-form-item label="图片链接" label-width="80px">
                    <el-input v-model="modalData.url"></el-input>
                </el-form-item>
                <el-form-item label="图片蒙版链接" label-width="80px" v-if="modalData.mask">
                    <el-input v-model="modalData.mask"></el-input>
                </el-form-item>
                <el-form-item label="是否使用动画" label-width="80px" v-if="modalData.configType !== 'bgs'">
                    <el-switch v-model="modalData.ani"></el-switch>
                </el-form-item>
                <template v-if="modalData.ani">
                    <el-form-item label="动画类型" label-width="80px">
                        <el-select v-model="modalData.aniName" placeholder="请选择" filterable>
                            <el-option label="无" value=""></el-option>
                            <el-option v-for="(item,i) in options" :label="item" :value="item" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-col :span="11">
                        <el-form-item label="动画执行时间(秒)" label-width="80px">
                            <el-input-number v-model="modalData.duration" :max="5"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="动画延迟(秒)" label-width="80px">
                            <el-input-number v-model="modalData.delay" :max="5"></el-input-number>
                        </el-form-item>
                    </el-col>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditModal">取 消</el-button>
                <el-button type="primary" @click="editElement">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="将数据复制给开发" v-model="dataModalShow">
            <p style="word-wrap: break-word;">{{dataForCopy}}</p>
        </el-dialog>
    </div>
</template>

<script>
    import AlbumPreview from '../../components/AlbumPreview.vue'
    import { ipcRenderer } from 'electron'

    import mock from './mock'

    const defaultModalData = {
        index: 0,
        i: 0,
        configType: '',
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        z: 0,
        ani: false,
        aniName: '',
        delay: '',
        duration: '',
        url: '',
        mask: '',
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0
    }

    const options = ['bounce','flash','pulse','rubberBand','shake','headShake','swing','tada','wobble','jello','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig','flipInX','flipInY','flipOutX','flipOutY','lightSpeedIn','lightSpeedOut','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutUpLeft','rotateOutUpRight','hinge','rollIn','rollOut','zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp','zoomOut','zoomOutDown','zoomOutLeft','zoomOutRight','zoomOutUp','slideInDown','slideInLeft','slideInRight','slideInUp','slideOutDown','slideOutLeft','slideOutRight','slideOutUp']

    export default {
        data () {
            return {
                mainConfig: {
                    albumName: '',
                    desc: ''
                },
                musicStart: '00:00',
                musicEnd: '00:00',
                album: mock,
                options: options,

                modalData: JSON.parse(JSON.stringify(defaultModalData)),
                modalShow: false,

                dataModalShow: false,
                dataForCopy: ''
            }
        },
        mounted () {
            console.log(this.album)
            ipcRenderer.on('ALBUM_PSD_FILE_COMPLETE', (event, data) => {
                console.log('complete')
                this.album = data
            })
        },
        methods: {
            cutMusic () {
                ipcRenderer.send('CUT_ALBUM_MUSIC', {
                    filePath: ''
                })
            },
            uploadPSD (file) {
                ipcRenderer.send('UPLOAD_ALBUM_PSD_FILE', {
                    filePath: file.path
                })
                console.log('uploading')
                return false
            },

            // 打开
            openEditModal () {
                this.modalShow = true
            },

            // 取消
            closeEditModal () {
//                this.modalData = JSON.parse(JSON.stringify(defaultModalData))
                this.modalShow = false
            },

            // 即将修改
            willEditElement (type, index, i) {
                let config = this.album.slides[index][type][i]
                if (config) {
                    this.modalData.index = index
                    this.modalData.i = i
                    this.modalData.configType = type
                    this.modalData.z = config.z
                    this.modalData.url = config.url
                    if (type !== 'bgs') {
                        this.modalData.x = config.x
                        this.modalData.y = config.y
                        this.modalData.w = config.w
                        this.modalData.h = config.h
                    }

                    if (type === 'photos') {
                        this.modalData.dx = config.dx
                        this.modalData.dy = config.dy
                        this.modalData.dw = config.dw
                        this.modalData.dh = config.dh
                        this.modalData.mask = config.mask
                    }


                    if (config.ani) {
                        this.modalData.ani = config.ani
                        this.modalData.aniName = config.aniName
                        this.modalData.delay = config.delay
                        this.modalData.duration = config.duration
                    } else {
                        this.modalData.ani = false
                    }
                }
                this.openEditModal()
            },

            // 修改
            editElement () {
                this.closeEditModal()
                let index = this.modalData.index
                let i = this.modalData.i
                let type = this.modalData.configType
                let config = this.album.slides[index][type][i]

                config.z = this.modalData.z
                config.url = this.modalData.url

                if (type !== 'bgs') {
                    config.x = this.modalData.x
                    config.y = this.modalData.y
                    config.w = this.modalData.w
                    config.h = this.modalData.h
                }

                if (type === 'photos') {
                    config.dx = this.modalData.dx
                    config.dy = this.modalData.dy
                    config.dw = this.modalData.dw
                    config.dh = this.modalData.dh
                    config.mask = this.modalData.mask
                }

                config.ani = this.modalData.ani || void 0

                if (this.modalData.ani) {
                    config.aniName = this.modalData.aniName
                    config.delay = this.modalData.delay
                    config.duration = this.modalData.duration
                } else {
                    config.aniName = void 0
                    config.delay = void 0
                    config.duration = void 0
                }
            },

            // 生成数据
            generateAlbumConfig () {
                this.dataModalShow = true
                let data = JSON.parse(JSON.stringify(this.album))
                data.slides.forEach(v => {
                    v.photos && v.photos.forEach(v => {
                        if (!v.ani) {
                            v.ani = void 0
                            v.aniName = void 0
                            v.delay = void 0
                            v.duration = void 0
                        }
                    })
                    v.elements && v.elements.forEach(v => {
                        if (!v.ani) {
                            v.ani = void 0
                            v.aniName = void 0
                            v.delay = void 0
                            v.duration = void 0
                        }
                    })
                })
                this.dataForCopy = JSON.stringify(data)
            }
        },
        components: {
            AlbumPreview
        }
    }
</script>

<style lang="less">
    .album-base-container {
        margin-bottom: 24px;
    }
    .album-form {
        width: 400px;
    }
    .upload-image {
        margin-bottom: 10px;
    }
    .upload-image-preview {
        max-height: 603px;
    }

    .album-preview-item {
        display: flex;
        border-bottom: 1px #eee solid;
    }
    .album-preview-graph {
        flex: 0 0 375px;
        height: 603px;
        background: red;
    }
    .album-preview-elements {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        padding: 24px 24px 0;
    }
    .album-preview-element {
        flex: 0 0 200px;
        margin-right: 20px;
        padding-bottom: 24px;
    }
    .album-preview-image {
        position: relative;
        width: 200px;
        height: 200px;
        background: #FAFAFA;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 200px;
            max-height: 200px;

        }
    }

    .photos-edit-area {
        margin-bottom: 24px;
        border: 1px solid #FF4965;
        padding-top: 24px;
    }
    .photos-edit-area-notice {
        margin-bottom: 12px;
        text-align: center;
        font-size: 16px;
    }
</style>