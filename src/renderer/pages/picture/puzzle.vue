<template>
    <div class="picture-puzzle">
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
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'

    export default {
        data () {
            return {}
        },
        mounted () {
            ipcRenderer.on('PUZZLE_PSD_FILE_COMPLETE', (event, data) => {
                console.log('complete')
                console.log(data)
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