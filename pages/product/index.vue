<template>
  <f7-page @infinite="loadMoreMethod" hide-toolbar-on-scroll infinite :infinite-distance="50" :infinite-preloader="infinitePreloader" :reloadPage="true">
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Menu</f7-nav-title>
    </f7-navbar>
    <f7-toolbar tabbar top>
      <f7-link @click="productsFilter.popup = true" icon-f7="filter">Filter</f7-link>
      <f7-popup @popup:closed="productsFilter.popup = false" class="product--index--filter-popup" :opened="productsFilter.popup">
        <f7-page>
          <f7-navbar>
            <f7-nav-left>
              <f7-link icon-material="close" popup-close></f7-link>
            </f7-nav-left>
            <f7-nav-title>Filter</f7-nav-title>
            <f7-nav-right>
              <f7-link @click="filterPopupResetMethod">Reset</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-list @submit.prevent="filterPopupShowMethod" form>
            <f7-row>
              <f7-col>
                <f7-list>
                  <f7-list-input @input="productsFilter.sell_price_gte = $event.target.value" clear-button label="Minimum Price" type="number" :value="productsFilter.sell_price_gte"></f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list>
                  <f7-list-input @input="productsFilter.sell_price_lte = $event.target.value" clear-button label="Maximum Price" type="number" :value="productsFilter.sell_price_lte"></f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>
            <input hidden type="submit" />
          </f7-list>
          <f7-toolbar position="bottom" tabbar>
            <f7-link @click="filterPopupShowMethod">Show</f7-link>
          </f7-toolbar>
        </f7-page>
      </f7-popup>
      
      <f7-link @click="productsSort.popup = true" icon-material="filter_list">Sort</f7-link>
      <f7-popup @popup:closed="productsSort.popup = false" class="product--index--sort-popup" :opened="productsSort.popup">
        <f7-page>
          <f7-navbar>
            <f7-nav-left>
              <f7-link icon-material="close" popup-close></f7-link>
            </f7-nav-left>
            <f7-nav-title>Sort</f7-nav-title>
            <f7-nav-right>
              <f7-link @click="sortPopupResetMethod">Reset</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-list>
            <f7-list-item @change="productsSort.order_by = $event.target.value" name="productsSort.order_by" radio value="-updated_at" :checked="productsSort.order_by == '-updated_at'">Latest</f7-list-item>
            <f7-list-item @change="productsSort.order_by = $event.target.value" name="productsSort.order_by" radio value="sell_price" :checked="productsSort.order_by == 'sell_price'">Lowest Price</f7-list-item>
            <f7-list-item @change="productsSort.order_by = $event.target.value" name="productsSort.order_by" radio value="-sell_price" :checked="productsSort.order_by == '-sell_price'">Highest Price</f7-list-item>
          </f7-list>
          <f7-toolbar position="bottom" tabbar>
            <f7-link @click="sortPopupApplyMethod">Apply</f7-link>
          </f7-toolbar>
        </f7-page>
      </f7-popup>
    </f7-toolbar>
    <f7-block-title>
      <f7-row v-if="loading">
        <div class="skeleton-block skeleton-effect-blink"></div>
      </f7-row>
      <f7-row v-if="! loading">
        {{ this.productsMeta.total }} product(s)
      </f7-row>
    </f7-block-title>
    <div v-if="loading">
      <f7-block v-for="(product, i) in 5" :key="i">
        <f7-row>
          <f7-col>
            <div class="product--index--image skeleton-block skeleton-effect-blink"></div>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            <div class="skeleton-effect-blink skeleton-text">Product Name</div>
          </f7-col>
        </f7-row>
        <f7-row>
            <div class="skeleton-effect-blink skeleton-text">Product Sell Price</div>
        </f7-row>
      </f7-block>
    </div>
    <div v-if="! loading">
      <f7-block v-for="(product, i) in products" :key="i">
        <f7-row>
          <f7-col>
            <img @click="$f7router.navigate('/product/' + product.id + '/' + product.slug)" src="https://via.placeholder.com/400" style="width: 100%" />
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            <f7-link @click="$f7router.navigate('/product/' + product.id + '/' + product.slug)">{{ product.name }}</f7-link>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            Rp. {{ product.sell_price }}
            <f7-button @click="addMethod($f7route.params.id)" fill style="float: right;">Add</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </div>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      infiniteAllow: true,
      infinitePreloader: true,
      loading: true,
      products: [],
      productsFilter: {
        popup: false,
        sell_price_gte: this.$f7route.query.sell_price_gte ? this.$f7route.query.sell_price_gte : '',
        sell_price_lte: this.$f7route.query.sell_price_lte ? this.$f7route.query.sell_price_lte : '',
      },
      productsMeta: {},
      productsParam: {
        page: 1,
        per_page: 5,
      },
      productsSort: {
        order_by: this.$f7route.query.order_by ? this.$f7route.query.order_by : '-updated_at',
        popup: false
      }
    }
  },
  created() {
    this.getProductsMethod()
  },
  methods: {
    addMethod(id) {
      this.$f7.dialog.preloader()
      setTimeout(() => {
        this.$f7.dialog.close()
      }, 2000);
    },
    filterPopupResetMethod() {
      this.productsFilter.sell_price_gte = ''
      this.productsFilter.sell_price_lte = ''
    },
    filterPopupShowMethod() {
      this.$f7router.navigate(
        {
          name: 'product',
          query: {
            order_by: this.productsSort.order_by,
            sell_price_gte: this.productsFilter.sell_price_gte,
            sell_price_lte: this.productsFilter.sell_price_lte
          }
        },
        {
          ignoreCache: true,
          reloadCurrent: true
        }
      )
      this.productsFilter.popup = false
    },
    getProductsMethod(id) {
      this.$axios.get('/product', {
          params: { ...this.productsFilter, ...this.productsParam }
        })
        .then(response => {
          this.products = this.products.concat(response.data.data)
          this.productsParam.page += 1
          this.productsMeta = response.data.meta
        })
        .finally(() => {
          this.infiniteAllow = true
          this.loading = false
        })
    },
    loadMoreMethod() {
      if (! this.infiniteAllow) return
      this.infiniteAllow = false

      if (this.products.length >= this.productsMeta.total) {
        this.infinitePreloader = false
        return
      }

      this.getProductsMethod()
    },
    sortPopupApplyMethod() {
      this.$f7router.navigate(
        {
          name: 'product',
          query: {
            order_by: this.productsSort.order_by,
            sell_price_gte: this.productsFilter.sell_price_gte,
            sell_price_lte: this.productsFilter.sell_price_lte
          }
        },
        {
          ignoreCache: true,
          reloadCurrent: true
        }
      )
      this.productsSort.popup = false
    },
    sortPopupResetMethod() {
      this.productsSort.order_by = '-updated_at'
    },
  }
}
</script>

<style>
.product--index--image {
  background-position: center;
  height: 0;
  padding-bottom: 100%;
}
</style>
