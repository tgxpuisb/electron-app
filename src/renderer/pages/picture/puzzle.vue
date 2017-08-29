<template>
    <div class="picture-puzzle"
         v-loading.fullscreen="fullscreenLoading"
         :element-loading-text="loadingText"
    >
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
        <el-input v-model="puzzleData" type="textarea" autosize></el-input>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'

    export default {
        data () {
            return {
                puzzleData: '',
                fullscreenLoading: false,
                loadingText: '正在玩命切图'
            }
        },
        mounted () {
            ipcRenderer.on('PUZZLE_PSD_FILE_COMPLETE', (event, data) => {
                this.fullscreenLoading = false
                console.log('complete')
                console.log(data)
                this.puzzleData = JSON.stringify(data)
            })

            ipcRenderer.on('PUZZLE_PSD_FILE_PROCESS', (event, data) => {
                this.loadingText = '正在玩命切图,已完成' + data.complete + '/' + data.total
            })

            ipcRenderer.on('PUZZLE_PSD_FILE_START', (event, data) => {
                this.fullscreenLoading = true
            })

            ipcRenderer.on('PUZZLE_PSD_FILE_ERROR', (event, data) => {
                this.fullscreenLoading = false
                this.$alert({
                    title: '切图过程出错了,其实我也不想的,如果连续几次都出错请联系开发',
                    message: data.toString(),
                    type: 'error'
                })
            })
        },
        methods: {
            uploadPSD (file) {
                ipcRenderer.send('UPLOAD_PUZZLE_PSD_FILE', {
                    filePath: file.path
                })
                console.log('uploading')
                return false
            }
        }
    }
</script>

<style lang="less">
    .picture-puzzle {
        padding-top: 10px;
    }
    .upload-psd {
        margin: 0 auto;
        width: 360px;
        text-align: center;
    }
</style>