<template>
  <el-card v-loading.lock="loading">
    <div slot="header">Orders</div>
    <el-main class="table-list-wrapper">
      <el-table :data="data">
        <el-table-column
            :resizable="false"
            type="index"
            :index="indexMethod"
            label="#"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="First Name"
            prop="first_name"
            width="150"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Last Name"
            prop="last_name"
            width="150"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Phone"
            prop="phone"
            width="130"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Message"
            prop="message"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Date"
            prop="date"
            width="100"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Time"
            prop="time"
            width="100"
        >
        </el-table-column>
        <el-table-column
            :resizable="false"
            label="Created date"
            prop="create_at"
            width="130"
        >
          <template slot-scope="scope">
            {{
              $moment(scope.row.order_created)
                  .utc()
                  .format("YYYY-MM-DD HH:mm")
            }}
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col align="right" :span="22">
          <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="count"
              :page-size="page_size"
              :hide-on-single-page="true"
              :background="true"
              :current-page="parseInt(this.$route.query.page, 10)"
          >
          </el-pagination>
        </el-col>
        <el-col :span="2">
          <div v-if="count > 20" class="pagination-total">
            <span>{{ `Total: ${count}` }}</span>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-card>
</template>

<script>
export default {
  name: "BookedTables",
  data() {
    return {
      loading: false,
      data: [],
      count: null,
      current_page: 1,
      next: null,
      next_page: null,
      page_size: 20,
      previous: null
    };
  },
  methods: {
    loadOrders() {
      this.loading = true;
      this.current_page = this.$route.query.page ? this.$route.query.page : 1;
      this.$http("/table-api/tables/", {
        params: {
          page: this.current_page,
          ordering: "-id"
        }
      })
          .then(({ data }) => {
            this.data = data.results;
            this.count = data.count;
            this.current_page = data.current_page;
            this.next = data.next;
            this.next_page = data.next_page;
            this.page_size = data.page_size;
            this.previous = data.previous;
            console.log(data);
          })
          .catch(() => {})
          .finally(() => {
            this.loading = false;
          });
    },
    handleCurrentChange(val) {
      this.$router
          .replace({
            query: { page: val }
          })
          .catch(() => {});
      this.loadOrders();
    },
    indexMethod(index) {
      if (this.current_page > 1 && this.current_page) {
        return index + this.page_size * (this.$route.query.page - 1) + 1;
      } else {
        return index + 1;
      }
    }
  },
  mounted() {
    this.loadOrders();
  }
};
</script>

<style scoped>
.table-list-wrapper {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.pagination {
  margin-top: 7px;
}
.pagination-total {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding-top: 15px;
}
</style>
