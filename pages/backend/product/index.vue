<template>
  <f7-page @page:afterin="authCheck(); getProductsMethod()">
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title title="Product"></f7-nav-title>
    </f7-navbar>
    <div class="card data-table data-table-init">
      <div class="card-header">
        <div class="data-table-actions" v-if="actionFilter">
          <f7-link href="/backend/product/create/" icon-f7="add" text="Create"></f7-link>
          <f7-link @click="productsFilter.popup = true" icon-f7="filter" text="Filter"></f7-link>
          <f7-popup @popup:closed="productsFilter.popup = false" class="product--index--filter-popup" :opened="productsFilter.popup">
            <f7-page>
              <f7-navbar>
                <f7-nav-left>
                  <f7-link icon-material="close" popup-close></f7-link>
                </f7-nav-left>
                <f7-nav-title title="Filter"></f7-nav-title>
                <f7-nav-right>
                  <f7-link @click="filterPopupResetMethod" text="Reset"></f7-link>
                </f7-nav-right>
              </f7-navbar>
              <f7-list @submit.prevent="filterPopupShowMethod" form>
                <f7-list-input @input="productsFilter.name = $event.target.value" clear-button floating-label label="Name" outline placeholder="Name" type="text" :value="productsFilter.name"></f7-list-input>
                <f7-list-input @input="productsFilter.active = $event.target.value" floating-label label="Active" outline placeholder="Active" type="select" :value="productsFilter.active">
                  <option v-for="(productsActiveOption, i) in productsActiveOptions" :key="i" :value="productsActiveOption.value">{{ productsActiveOption.name }}</option>
                </f7-list-input>
                <input hidden type="submit" />
              </f7-list>
              <f7-toolbar position="bottom" tabbar>
                <f7-link @click="filterPopupShowMethod" text="Show"></f7-link>
              </f7-toolbar>
            </f7-page>
          </f7-popup>
        </div>
        <div class="data-table-actions" v-if="actionDelete">
          <f7-link @click="deleteMethod" icon-material="delete" text="Delete"></f7-link>
        </div>
      </div>
      <div class="card-content">
        <table v-if="loading">
          <thead>
            <tr>
              <th>
                <f7-skeleton-block class="skeleton-effect-blink"></f7-skeleton-block>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in productsParam.per_page" :key="i">
              <td class="label-cell">
                <f7-skeleton-block class="skeleton-effect-blink"></f7-skeleton-block>
              </td>
            </tr>
          </tbody>
        </table>
        <table v-if="! loading">
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="checkbox">
                  <input type="checkbox" />
                  <i class="icon-checkbox"></i>
                </label>
              </th>
              <th
                @click="productsSort.order_by = productsSort.order_by == 'name' ? '-name' : 'name'; getProductsMethod()" 
                class="label-cell sortable-cell"
                :class="{ 
                  'sortable-asc': productsSort.order_by == 'name',
                  'sortable-cell-active': ['name', '-name'].includes(productsSort.order_by),
                  'sortable-desc': productsSort.order_by == '-name'
                }"
              >Name</th>
              <th
                @click="productsSort.order_by = productsSort.order_by == 'sell_price' ? '-sell_price' : 'sell_price'; getProductsMethod()" 
                class="numeric-cell sortable-cell"
                :class="{ 
                  'sortable-asc': productsSort.order_by == 'sell_price',
                  'sortable-cell-active': ['sell_price', '-sell_price'].includes(productsSort.order_by),
                  'sortable-desc': productsSort.order_by == '-sell_price'
                }"
              >Sell Price</th>
              <th
                @click="productsSort.order_by = productsSort.order_by == 'active' ? '-active' : 'active'; getProductsMethod()" 
                class="label-cell sortable-cell"
                :class="{ 
                  'sortable-asc': productsSort.order_by == 'active',
                  'sortable-cell-active': ['active', '-active'].includes(productsSort.order_by),
                  'sortable-desc': productsSort.order_by == '-active'
                }"
              >Active</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="checkbox-cell">
                <label class="checkbox">
                  <input @change="productsIdChangeMethod" type="checkbox" v-model="productsId" :value="product.id" />
                  <i class="icon-checkbox"></i>
                </label>
              </td>
              <td class="label-cell">
                <f7-link :href="`/backend/product/edit/${product.id}`" :text="product.name"></f7-link>
              </td>
              <td class="numeric-cell">{{ product.sell_price }}</td>
              <td class="label-cell">{{ product.active ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-table-footer">
        <div class="data-table-rows-select">
          Per page:
          <div class="input input-dropdown">
            <select @change="productsParam.page = 1; getProductsMethod()" v-model="productsParam.per_page">
              <option v-for="(productsPerPageOption, i) in productsPerPageOptions" :key="i" :value="productsPerPageOption">{{ productsPerPageOption }}</option>
            </select>
          </div>
        </div>
        <div class="data-table-pagination">
          <span class="data-table-pagination-label">{{ Number(productsMeta.from) }}-{{ Number(productsMeta.to) }} of {{ productsMeta.total }}</span>
          <a @click="productsParam.page--; getProductsMethod()" class="link" href="#" :class="{ 'disabled': productsMeta.current_page == 1 }">
            <i class="icon icon-prev color-gray"></i>
          </a>
          <a @click="productsParam.page++; getProductsMethod()" class="link" href="#" :class="{ 'disabled': productsMeta.current_page >= productsMeta.last_page }">
            <i class="icon icon-next color-gray"></i>
          </a>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      actionDelete: false,
      actionFilter: true,
      loading: true,
      products: [],
      productsActiveOptions: [
        { name: '', value: '' },
        { name: 'Yes', value: 1 },
        { name: 'No', value: 0 }
      ],
      productsFilter: {
        active: this.$f7route.query.active ? this.$f7route.query.active : '',
        name: this.$f7route.query.name ? this.$f7route.query.name : '',
        popup: false
      },
      productsId: [],
      productsMeta: {},
      productsParam: {
        page: this.$f7route.query.page ? this.$f7route.query.page : 1,
        per_page: this.$f7route.query.per_page ? Number(this.$f7route.query.per_page) : 10
      },
      productsSort: {
        order_by: this.$f7route.query.order_by ? this.$f7route.query.order_by : '-updated_at',
      },
      productsPerPageOptions: [5, 10, 25, 50, 100],
    }
  },
  methods: {
    authCheck() {
      if (! this.$auth.loggedIn) {
        this.$f7router.back()
      }
    },
    async deleteMethod() {
      var products = this.productsId
      this.$f7.dialog.preloader()

      for (let i in products) {
        let id = products[i]
        
        await this.$axios.delete('/product/' + id)
          .then(() => {
            this.productsId = this.productsId.filter((value) => {
              return value != id
            })
          })
          .catch(e => {
            this.$f7.toast.create({
              closeButton: true,
              closeTimeout: 5000,
              text: e.response.data.message
            }).open()
          })
      }

      this.getProductsMethod()
      this.$f7.dialog.close()
      this.$f7.toast.create({
        closeButton: true,
        closeTimeout: 5000,
        text: 'Deleted.'
      }).open()
    },
    filterPopupResetMethod() {
      this.productsFilter.active = ''
      this.productsFilter.name = ''
    },
    filterPopupShowMethod() {
      this.productsParam.page = 1
      this.productsFilter.popup = false
      
      this.getProductsMethod()
    },
    getProductsMethod() {
      this.loading = true

      this.$axios.get('/product', {
          params: { ...this.productsFilter, ...this.productsParam, ...this.productsSort }
        })
        .then(response => {
          this.products = response.data.data
          this.productsMeta = response.data.meta
        })
        .finally(() => {
          this.loading = false
        })
    },
    productsIdChangeMethod() {
      this.actionDelete = false
      this.actionFilter = true

      if (this.productsId.length > 0) {
        this.actionDelete = true
        this.actionFilter = false
      }
    }
  }
}
</script>
