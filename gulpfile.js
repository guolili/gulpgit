const gulp = require('gulp');
const git = require('gulp-git');
const miniCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const mergeStream = require('merge-stream');
const sque = require('run-sequence');
gulp.task('init', function () { // 初始化
    git.init((err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('add', () => { // 提交到缓存
    return gulp.src('./')
        .pipe(git.add());
});
gulp.task('addremote', () => { // 添加remote
    git.addRemote('origin', 'https://github.com/lilydream/gulpgit', (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('removeremote', () => { // 移除 remote
    git.removeRemote('origin', (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('push', () => { // push 
    git.push('origin', 'master', (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('pull', () => { // pull 从远程提取数据
    git.pull('origin', 'master', {args: '--rebase'}, err => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('fetch', () => { // 更新
    git.fetch('', '', {args: '--all'}, err => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('clone', () => { // clone
    git.clone('https://github.com/lilydream/gulpgit', {args: './sub/folder'}, (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('tag', () => { // 暂时不知道
    git.tag('v2.2.2', '', (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('tagsec', () => { // 暂时不知道
    git.tag('v3.3.3', 'version message with singled key', {signed: true}, (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('branch', () => {
    git.branch('newBranch', (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('checkout', () => { // 切换nranch
    git.checkout('branchName', (err) => {
        throw err;
    });
});
gulp.task('merge', () => {
    git.merge('branchName', err => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('reset', () => { // 重置
    git.merge('SHA', err => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('diff', () => { // 查看修改代码
    gulp.src('./*')
        .pipe(git.diff('master', {log: true}))
        .pipe(gulp.dest('./diff.out'));
});
gulp.task('rm', () => { // 移除
    return gulp.src('./gulpfile.js')
        .pipe(git.rm());
});
gulp.task('addSubmodule', () => { // 暂时不知道
    git.addSubmodule('https://github.com/lilydream/gulpgit', 'git-test', {args: '-b master'});
});
gulp.task('updateSubmodules', () => { // 暂时不知道
    git.updateSubmodule({args: '--init'});
});
gulp.task('log', () => { // 查看日志
    git.exec({args: 'log --follow index.js'}, (err, stdot) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('clean', () => {
    git.clean({args: '-f'}, (err) => {
        if (err) {
            throw err;
        }
    });
});
gulp.task('commit', () => { // 添加注释
    return gulp.src('./git/*')
        .pipe(git.commit('initial commit introduce item'));
});
gulp.task('minify', () => { // 压缩功能css js
    const minicss = gulp.src('App/content/css/*.css')
        .pipe(miniCss())
        .pipe(gulp.dest('./App/load'));
    const minijs = gulp.src('App/content/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./App/load'));
    return mergeStream(minicss, minijs);
});
gulp.task('clean', () => {
    gulp.src('./App/load')
        .pipe(clean());
});
gulp.task('default', () => {
    sque('clean', ['minify']);
});
