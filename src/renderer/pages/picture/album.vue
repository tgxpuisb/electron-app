<template>
    <el-row class="picture-album">
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
                    >
                        <el-button size="small" type="primary">上传封面</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-col>
                <el-col :span="8">
                    <el-upload
                        action=""
                    >
                        <el-button size="small" type="primary">上传镂空头像封面</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-col>
                <el-col :span="8">
                    <el-upload
                        action=""
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
                    >
                    </el-time-select>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="8">预览区域</el-col>
    </el-row>
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

        },
        methods: {
            cutMusic () {
                ipcRenderer.send('CUT_ALBUM_MUSIC', {
                    filePath: ''
                })
            }
        }
    }
</script>

<style lang="less">
    .album-form {
        width: 400px;
    }
</style>