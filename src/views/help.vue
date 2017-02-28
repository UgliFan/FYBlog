<template>
  <div>
    <nv-header :func-type="2"></nv-header>
    <section class="container-body">
      <list-trans class-name="issue-list" trans-name="fade" :page="ISSUE_DATA.page">
        <issue-item v-for="(issue, index) in ISSUE_DATA.list" :issue="issue" :key="issue" :data-index="index"></issue-item>
      </list-trans>
      <scroll-load :loading="loading" :has-more="ISSUE_DATA.hasMore" :callback="pageList"></scroll-load>
    </section>
    <confirm-dialog></confirm-dialog>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .issue-list {
    list-style: none;
    width: 100%;
    padding: 10px 0;
    overflow-x: hidden;
    .issue-empty {
      padding: 20px;
      line-height: 30px;
      font-size: 16px;
      color: $grayer;
      text-align: center;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV, SET_POS, AJAX_DATA } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import IssueItem from '../components/IssueItem';
  import ListTrans from '../components/ListTrans';
  import ScrollLoad from '../components/ScrollLoad';
  import confirmDialog from '../components/Confirm';
  import store from '../libs/data';
  import { pageUtils } from '../libs/mixin';

  export default {
    mixins: [pageUtils],
    data() {
      return {
        loading: false,
        total: 0
      };
    },
    computed: mapGetters([
      'NAV_LIST', 'SCROLL_POS', 'ISSUE_DATA'
    ]),
    components: {
      nvHeader, IssueItem, ListTrans, ScrollLoad, confirmDialog
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: 'Q&A',
            routerName: 'help'
          }
        });
        this.getInitList();
      },
      getInitList() {
        if (!this.ISSUE_DATA.loaded) {
          this.loading = true;
          store.getIssueList().then(data => {
            this.loading = false;
            this.total = data.total;
            this.$store.dispatch({
              type: AJAX_DATA,
              module: 'issue',
              page: 0,
              list: data.result,
              hasMore: data.result.length === 20
            });
          });
        }
      },
      pageList() {
        this.loading = true;
        store.getIssueList(this.ISSUE_DATA.page + 1).then(data => {
          this.loading = false;
          this.total = data.total;
          this.$store.dispatch({
            type: AJAX_DATA,
            module: 'issue',
            page: this.ISSUE_DATA.page + 1,
            list: this.ISSUE_DATA.list.concat(data.result),
            hasMore: data.result.length === 20
          });
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch({
        type: SET_POS,
        module: 'issue',
        pos: document.body.scrollTop
      });
      next();
    }
  };
</script>
