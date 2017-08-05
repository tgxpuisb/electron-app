<template>
    <div id="app">
        <el-row>
            <el-col :span="4">
                <div class="menu-header">
                    <img class="menu-avatar" :src="userAvatar"/>
                    <div class="menu-username">{{ userName }}</div>
                    <div class="menu-slogan">think big, keep shipping</div>
                </div>
                <el-menu :router="true">
                    <template v-for="(item, index) in menus">
                        <el-submenu
                            v-if="item.sub"
                            :index="String(index)"
                            :key="index"
                        >
                            <template slot="title">
                                <i v-if="item.icon" :class="item.icon"></i>
                                {{ item.title }}
                            </template>
                            <el-menu-item
                                v-for="(sub, subIndex) in item.sub"
                                :index="index + '-' + subIndex"
                                :key="subIndex"
                                :route="sub.path"
                            >
                                <i v-if="sub.icon" :class="sub.icon"></i>
                                {{ sub.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                            v-else
                            :index="String(index)"
                            :route="item.path"
                        >
                            <i v-if="item.icon" :class="item.icon"></i>
                            {{ item.title }}
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <el-menu mode="horizontal">
                    <template v-for="(item, index) in nav">
                        <el-submenu
                                v-if="item.sub"
                                :index="String(index)"
                                :key="index"
                        >
                            <template slot="title">
                                <i v-if="item.icon" :class="item.icon"></i>
                                {{ item.title }}
                            </template>
                            <el-menu-item
                                    v-for="(sub, subIndex) in item.sub"
                                    :index="index + '-' + subIndex"
                                    :key="subIndex"
                            >
                                <i v-if="sub.icon" :class="sub.icon"></i>
                                {{ sub.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                                v-else
                                :index="String(index)"
                        >
                            <i v-if="item.icon" :class="item.icon"></i>
                            {{ item.title }}
                        </el-menu-item>
                    </template>
                </el-menu>
                <div class="view-container">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        computed: mapState('Menu', {
            userName: state => state.userName,
            userAvatar: state => state.userAvatar,
            menus: state => state.menus,
            nav: state => state.nav
        }),
        mounted () {
            this.getAppPath()
        },
        methods: {
            ...mapActions('App', [
                'getAppPath'
            ])
        }
    }
</script>

<style lang="less">
    html {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .menu-header {
        position: relative;
        box-sizing: border-box;
        background: #EFF2F7;
        padding-top: 92px;
    }
    .menu-avatar {
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 34px;
        transform: translateX(-50%);
        width: 48px;
        height: 48px;
    }
    .menu-username {
        margin-bottom: 6px;
        color: #48576a;
        text-align: center;
    }
    .menu-slogan {
        padding-bottom: 14px;
        font-size: 12px;
        color: #48576a;
        text-align: center;
    }
    .view-container {
        padding: 20px;
    }
</style>
