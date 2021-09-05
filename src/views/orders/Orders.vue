<template>
  <el-card v-loading.lock="loading">
    <div slot="header">Orders</div>
    <el-main class="order-list-wrapper">
      <el-table :data="data">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table border size="mini" :data="props.row.order_units">
              <el-table-column label="Meal">
                <template slot-scope="scope">
                  {{ scope.row.meal.name }}
                </template>
              </el-table-column>
              <el-table-column label="Price">
                <template slot-scope="scope">
                  {{ "$"+scope.row.meal.price }}
                </template>
              </el-table-column>
              <el-table-column label="Quantity" prop="quantity">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          type="index"
          :index="indexMethod"
          label="#"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="Customer name"
          prop="customer_name"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="Phone"
          prop="customer_phone_number"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="Address"
          prop="customer_address"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="Created date"
          prop="order_created"
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
  name: "Orders",
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
      this.$http("order-api/orders/", {
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
.order-list-wrapper {
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
