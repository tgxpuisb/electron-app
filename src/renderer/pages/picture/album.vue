<template>
    <div class="picture-album">
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
            <div class="album-preview-item">
                <div class="album-preview-graph">

                </div>
                <ul class="album-preview-elements">
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                    <li class="album-preview-element">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="album-preview-image">
                                <img src="http://b0.hucdn.com/img/common/loading.gif">
                            </div>
                            <div style="padding: 14px;">
                                <p>好吃的汉堡</p>
                                <div class="bottom clearfix">
                                    <el-button type="text">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'

    export default {
        data () {
            return {
                mainConfig: {
                    albumName: '',
                    desc: ''
                },
                musicStart: '00:00',
                musicEnd: '00:00'
            }
        },
        mounted () {
            ipcRenderer.on('ALBUM_PSD_FILE_COMPLETE', (event, data) => {
                console.log('complete')
                console.log(data)
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
            }
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
        padding: 24px 24px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex: 1;
    }
    .album-preview-element {
        flex: 0 0 200px;
        padding-bottom: 24px;
    }
    .album-preview-image {
        position: relative;
        width: 200px;
        height: 200px;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 200px;
            max-height: 200px;

        }
    }
</style>