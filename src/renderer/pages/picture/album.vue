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
                    <el-col :span="11">
                        <el-form-item label="宽度" label-width="80px">
                            <el-input-number v-model="modalData.w"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="高度" label-width="80px">
                            <el-input-number v-model="modalData.h"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="距离左端距离(x)" label-width="80px">
                            <el-input-number v-model="modalData.x"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="距离顶部距离(y)" label-width="80px">
                            <el-input-number v-model="modalData.y"></el-input-number>
                        </el-form-item>
                    </el-col>
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
                        <el-select v-model="modalData.aniName" placeholder="请选择">
                            <el-option label="测试" value="测试"></el-option>
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
    </div>
</template>

<script>
    import AlbumPreview from '../../components/AlbumPreview.vue'
    import { ipcRenderer } from 'electron'

    import mock from './mock'

    const defaultModalData = {
        configType: '',
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        z: 0,
        ani: false,
        aniName: '',
        delay: 0,
        duration: 0,
        url: '',
        mask: '',
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0
    }

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

                modalData: defaultModalData,
                modalShow: false
            }
        },
        mounted () {
            console.log(this.album)
            ipcRenderer.on('ALBUM_PSD_FILE_COMPLETE', (event, data) => {
                console.log('complete')
                this.album = data
            })
//            this.loadAnimateCSS()
        },
        methods: {
            loadAnimateCSS () {
                if (!document.querySelector('link.animate-css')) {
                    let link = document.createElement('link')
                    link.className = 'animate-css'
                    link.rel = 'stylesheet'
                    link.type = 'test/css'
                    link.href = 'http://m.yuerbao.com/assets/libs/animate.css'
                    document.head.appendChild(link)
                    link.onerror = () => {
                        console.log('load')
                    }
                }
            },
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
                this.modalData = {
                    ...defaultModalData
                }
                this.modalShow = false
            },

            // 即将修改
            willEditElement (type, index, i) {
                let config = this.album.slides[index][type][i]
                if (config) {
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
                    }
                }
                this.openEditModal()
            },

            // 修改
            editElement () {
                this.closeEditModal()
            },

            // 生成数据
            generateAlbumConfig () {

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