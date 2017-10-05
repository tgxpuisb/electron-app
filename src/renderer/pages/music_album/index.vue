<template>
    <div>
        <div class="music_album__panel">
            <el-button>创建</el-button>
        </div>
        <el-table
            :data="albumList"
            border
        >
            <el-table-column label="相册名" prop="name"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small">上线</el-button>
                    <el-button size="small">下线</el-button>
                    <el-button size="small">预览</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                albumList: [
                    {
                        name: '1',
                        url: '2',
                        type: 3,
                        desc: '444',
                        show: 1
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    .music_album {
        &__panel {
            margin-bottom: 10px;
        }
    }
</style>