<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-f7="chevron_left"></f7-link>
      </f7-nav-left>
    </f7-navbar>
    <div v-if="loading">
      <f7-block-title>
        <div class="skeleton-block skeleton-effect-blink"></div>
      </f7-block-title>
      <f7-block>
        <f7-row>
          <f7-col>
            <div class="product--id--slug--index--image skeleton-block skeleton-effect-blink"></div>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            <div class="skeleton-effect-blink skeleton-text">Sell Price</div>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            <div class="skeleton-effect-blink skeleton-block">___</div>
            <div class="skeleton-effect-blink skeleton-block">___</div>
            <div class="skeleton-effect-blink skeleton-block">___</div>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block>
        <div class="skeleton-effect-blink skeleton-block">___</div>
        <div class="skeleton-effect-blink skeleton-block">___</div>
        <div class="skeleton-effect-blink skeleton-block">___</div>
        <div class="skeleton-effect-blink skeleton-block">___</div>
        <div class="skeleton-effect-blink skeleton-block">___</div>
      </f7-block>
    </div>
    <div v-else>
      <f7-block-title>
        <div align="center">{{ product.name }}</div>
      </f7-block-title>
      <f7-block>
        <f7-row>
          <f7-col>
            <f7-swiper pagination :params="swiperParams">
              <f7-swiper-slide v-for="(image, index) in 3" :key="index">
                <img src="https://via.placeholder.com/400" style="width: 100%" />
              </f7-swiper-slide>
            </f7-swiper>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            Rp. {{ product.sell_price }}
            <f7-button @click="addMethod($f7route.params.id)" fill style="float: right;">Add</f7-button>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>{{ product.description }}</f7-col>
        </f7-row>
      </f7-block>
      <f7-block>
        <f7-card class="product--id--slug--description--card" outline>
          <f7-card-header>Description</f7-card-header>
          <f7-card-content>{{ product.description ? product.description : '-' }}</f7-card-content>
        </f7-card>
      </f7-block>
    </div>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      errors: {},
      loading: true,
      product: {},
      swiperParams: {
        pagination: {
          clickable: true
        }
      }
    }
  },
  created() {
    this.errors = Object.assign({}, this.$store.state.user.errors)
    this.product = Object.assign({}, this.$store.state.product)
    
    this.getProductMethod(this.$f7route.params.id)
  },
  methods: {
    addMethod(id) {
      this.$f7.dialog.preloader()
      setTimeout(() => {
        this.$f7.dialog.close()
      }, 2000);
    },
    getProductMethod(id) {
      this.$axios.get('/product/' + id)
        .then(response => {
          this.product = response.data.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.product--id--slug--description--card {
  margin: 0;
}
.product--id--slug--index--image {
  background-position: center;
  height: 0;
  padding-bottom: 100%;
}
</style>
