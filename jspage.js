define(function (require, exports, module) {
    /*
    说明:自定义分页组件
    作者:胡泽云
    日期:2019-01-06
    */
    var index = {
        data: {
            pageSize: 10,
            total: 100,
            curPage: 1,
            maxPageNum: 10
        },
        init: function (option) {
            var me = this;
            me.option = option;

            me.data.pageSize = option.pageSize;
            me.data.total = option.total;
            if (option.maxPageNum) {
                me.data.maxPageNum = option.maxPageNum;
            }
            me.render(option.containerId);
            //me.bind();

        },
        render: function (containerId) {
            var html = ""
            var me = this;
            var pageNum = Math.round(me.data.total / me.data.pageSize);
            //取中间值
            var midle = me.data.maxPageNum / 2;
            var beginPage = me.data.curPage - midle;
            var endPage = me.data.curPage + midle - 1;


            //开始边界处理
            if (beginPage <= 0) {
                beginPage = 1;
            }

            if (endPage < me.data.maxPageNum) {
                endPage += me.data.maxPageNum - endPage;
            }
            //结束边界
            if (endPage >= pageNum) {
                endPage = pageNum;
            }

            console.log(beginPage + " " + endPage);
            for (var num = beginPage; num <= endPage; num++) {

                if (me.data.curPage == num) {
                    html += "<span name='pageSpan' >" + num + "</span>&nbsp;";
                }
                else {
                    html += "<a name='page' href='javascript:;' >" + num + "</a>&nbsp;";
                }
            }
            //上一页 下一页
            if (beginPage > 1 && endPage < pageNum) {
                html = "<a id='prePage' href='javascript:;' >上一页</a>&nbsp;" + html +
                 "<a id='nextPage' href='javascript:;' >下一页</a>";
            }
            else {
                if (beginPage == 1) {
                    html += "&nbsp;<a id='nextPage' href='javascript:;' >下一页</a>";
                }
                else if (endPage == pageNum) {
                    html = "<a id='prePage' href='javascript:;' >上一页</a>&nbsp;" + html;
                }
            }
            html += "<div>总共:" + me.data.total + " 条，" + pageNum + "页</div>";
            if (containerId) {
                $("#" + containerId).html(html);
            }

            console.log(html);
            //重新绑定事件
            me.bind();
            if (me.option.pageChange) {
                //var beginRcordNum = me.data.curPage * this.option.pageSize;
                //var endRcordNum = beginRcordNum + this.option.pageSize;
                me.option.pageChange({
                    curPage: me.data.curPage,
                    //beginRcordNum: beginRcordNum,
                    //endRcordNum: endRcordNum,
                    pageSize: me.data.pageSize
                });
            }

        },
        bind: function () {
            var me = this;
            //绑定click 点击事件
            $("[name='page']").each(function (index, obj) {
                $(obj).on("click", function () {
                    var page = $(obj).text();
                    me.data.curPage = parseInt(page);
                    if (me.option.containerId) {
                        me.render(me.option.containerId);
                    }

                });
            });
            //上下页
            $("#prePage").on("click", function () {
                me.data.curPage--;
                if (me.option.containerId) {
                    me.render(me.option.containerId);
                }
            })
            //下一页
            $("#nextPage").on("click", function () {
                me.data.curPage++;
                if (me.option.containerId) {
                    me.render(me.option.containerId);
                }
            })
        }

    };
    exports = module.exports = index;
})