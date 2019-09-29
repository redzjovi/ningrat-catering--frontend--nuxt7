<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <NavbarLeftLinkBars></NavbarLeftLinkBars>
      </f7-nav-left>
      <f7-nav-title>Home</f7-nav-title>
    </f7-navbar>
    <f7-block-title>Menu</f7-block-title>
    <f7-row v-if="menuLoading">
      <f7-swiper :params="menuSwiperParams">
        <f7-swiper-slide v-for="(product, index) in 10" :key="index">
          <f7-card>
            <div class="card-header index--menu--card--header skeleton-block skeleton-effect-blink"></div>
            <f7-card-content>
              <div class="skeleton-effect-blink skeleton-text">Product Name</div>
              <div class="skeleton-effect-blink skeleton-text">Product Sell Price</div>
            </f7-card-content>
            <f7-card-footer>
              <f7-skeleton-block class="skeleton-effect-blink" style="height: var(--f7-button-height); width: 100%;"></f7-skeleton-block>
            </f7-card-footer>
          </f7-card>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-row>
    <f7-row v-else>
      <f7-swiper :params="menuSwiperParams">
        <f7-swiper-slide v-for="product in menuProducts" :key="product.id">
          <f7-card>
            <div @click="$f7router.navigate('/product/' + product.id + '/' + product.slug)" class="card-header index--menu--card--header" style="background-image: url(https://via.placeholder.com/200)"></div>
            <f7-card-content>
              <div>
                <f7-link @click="$f7router.navigate('/product/' + product.id + '/' + product.slug)">{{ product.name }}</f7-link>
              </div>
              <div>Rp {{ product.sell_price }}</div>
            </f7-card-content>
            <f7-card-footer>
              <f7-button @click="menuAddMethod(product.id)" class="index--menu--card--button--add" fill>Add</f7-button>
            </f7-card-footer>
          </f7-card>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-row>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos maxime incidunt id ab culpa ipsa omnis eos, vel excepturi officiis neque illum perferendis dolorum magnam rerum natus dolore nulla ex.</p>
      <p>Eum dolore, amet enim quaerat omnis. Modi minus voluptatum quam veritatis assumenda, eligendi minima dolore in autem delectus sequi accusantium? Cupiditate praesentium autem eius, esse ratione consequuntur dolor minus error.</p>
      <p>Repellendus ipsa sint quisquam delectus dolore quidem odio, praesentium, sequi temporibus amet architecto? Commodi molestiae, in repellat fugit! Laudantium, fuga quia officiis error. Provident inventore iusto quas iure, expedita optio.</p>
      <p>Eligendi recusandae eos sed alias delectus reprehenderit quaerat modi dolor commodi beatae temporibus nisi ullam ut, quae, animi esse in officia nesciunt sequi amet repellendus? Maiores quos provident nisi expedita.</p>
      <p>Dolorem aspernatur repudiandae aperiam autem excepturi inventore explicabo molestiae atque, architecto consequatur ab quia quaerat deleniti quis ipsum alias itaque veritatis maiores consectetur minima facilis amet. Maiores impedit ipsum sint.</p>
      <p>Consequuntur minus fugit vitae magnam illo quibusdam. Minima rerum, magnam nostrum id error temporibus odio molestias tempore vero, voluptas quam iusto. In laboriosam blanditiis, ratione consequuntur similique, quos repellendus ex!</p>
      <p>Error suscipit odio modi blanditiis voluptatibus tempore minima ipsam accusantium id! Minus, ea totam veniam dolorem aspernatur repudiandae quae similique odio dolor, voluptate quis aut tenetur porro culpa odit aliquid.</p>
      <p>Aperiam velit sed sit quaerat, expedita tempore aspernatur iusto nobis ipsam error ut sapiente delectus in minima recusandae dolore alias, cumque labore. Doloribus veritatis magni nisi odio voluptatum perferendis placeat!</p>
      <p>Eaque laboriosam iusto corporis iure nemo ab deleniti ut facere laborum, blanditiis neque nihil dignissimos fuga praesentium illo facilis eos beatae accusamus cumque molestiae asperiores cupiditate? Provident laborum officiis suscipit!</p>
      <p>Exercitationem odio nulla rerum soluta aspernatur fugit, illo iusto ullam similique. Recusandae consectetur rem, odio autem voluptate similique atque, alias possimus quis vitae in, officiis labore deserunt aspernatur rerum sunt?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos maxime incidunt id ab culpa ipsa omnis eos, vel excepturi officiis neque illum perferendis dolorum magnam rerum natus dolore nulla ex.</p>
      <p>Eum dolore, amet enim quaerat omnis. Modi minus voluptatum quam veritatis assumenda, eligendi minima dolore in autem delectus sequi accusantium? Cupiditate praesentium autem eius, esse ratione consequuntur dolor minus error.</p>
      <p>Repellendus ipsa sint quisquam delectus dolore quidem odio, praesentium, sequi temporibus amet architecto? Commodi molestiae, in repellat fugit! Laudantium, fuga quia officiis error. Provident inventore iusto quas iure, expedita optio.</p>
      <p>Eligendi recusandae eos sed alias delectus reprehenderit quaerat modi dolor commodi beatae temporibus nisi ullam ut, quae, animi esse in officia nesciunt sequi amet repellendus? Maiores quos provident nisi expedita.</p>
      <p>Dolorem aspernatur repudiandae aperiam autem excepturi inventore explicabo molestiae atque, architecto consequatur ab quia quaerat deleniti quis ipsum alias itaque veritatis maiores consectetur minima facilis amet. Maiores impedit ipsum sint.</p>
      <p>Consequuntur minus fugit vitae magnam illo quibusdam. Minima rerum, magnam nostrum id error temporibus odio molestias tempore vero, voluptas quam iusto. In laboriosam blanditiis, ratione consequuntur similique, quos repellendus ex!</p>
      <p>Error suscipit odio modi blanditiis voluptatibus tempore minima ipsam accusantium id! Minus, ea totam veniam dolorem aspernatur repudiandae quae similique odio dolor, voluptate quis aut tenetur porro culpa odit aliquid.</p>
      <p>Aperiam velit sed sit quaerat, expedita tempore aspernatur iusto nobis ipsam error ut sapiente delectus in minima recusandae dolore alias, cumque labore. Doloribus veritatis magni nisi odio voluptatum perferendis placeat!</p>
      <p>Eaque laboriosam iusto corporis iure nemo ab deleniti ut facere laborum, blanditiis neque nihil dignissimos fuga praesentium illo facilis eos beatae accusamus cumque molestiae asperiores cupiditate? Provident laborum officiis suscipit!</p>
      <p>Exercitationem odio nulla rerum soluta aspernatur fugit, illo iusto ullam similique. Recusandae consectetur rem, odio autem voluptate similique atque, alias possimus quis vitae in, officiis labore deserunt aspernatur rerum sunt?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos maxime incidunt id ab culpa ipsa omnis eos, vel excepturi officiis neque illum perferendis dolorum magnam rerum natus dolore nulla ex.</p>
      <p>Eum dolore, amet enim quaerat omnis. Modi minus voluptatum quam veritatis assumenda, eligendi minima dolore in autem delectus sequi accusantium? Cupiditate praesentium autem eius, esse ratione consequuntur dolor minus error.</p>
      <p>Repellendus ipsa sint quisquam delectus dolore quidem odio, praesentium, sequi temporibus amet architecto? Commodi molestiae, in repellat fugit! Laudantium, fuga quia officiis error. Provident inventore iusto quas iure, expedita optio.</p>
      <p>Eligendi recusandae eos sed alias delectus reprehenderit quaerat modi dolor commodi beatae temporibus nisi ullam ut, quae, animi esse in officia nesciunt sequi amet repellendus? Maiores quos provident nisi expedita.</p>
      <p>Dolorem aspernatur repudiandae aperiam autem excepturi inventore explicabo molestiae atque, architecto consequatur ab quia quaerat deleniti quis ipsum alias itaque veritatis maiores consectetur minima facilis amet. Maiores impedit ipsum sint.</p>
      <p>Consequuntur minus fugit vitae magnam illo quibusdam. Minima rerum, magnam nostrum id error temporibus odio molestias tempore vero, voluptas quam iusto. In laboriosam blanditiis, ratione consequuntur similique, quos repellendus ex!</p>
      <p>Error suscipit odio modi blanditiis voluptatibus tempore minima ipsam accusantium id! Minus, ea totam veniam dolorem aspernatur repudiandae quae similique odio dolor, voluptate quis aut tenetur porro culpa odit aliquid.</p>
      <p>Aperiam velit sed sit quaerat, expedita tempore aspernatur iusto nobis ipsam error ut sapiente delectus in minima recusandae dolore alias, cumque labore. Doloribus veritatis magni nisi odio voluptatum perferendis placeat!</p>
      <p>Eaque laboriosam iusto corporis iure nemo ab deleniti ut facere laborum, blanditiis neque nihil dignissimos fuga praesentium illo facilis eos beatae accusamus cumque molestiae asperiores cupiditate? Provident laborum officiis suscipit!</p>
      <p>Exercitationem odio nulla rerum soluta aspernatur fugit, illo iusto ullam similique. Recusandae consectetur rem, odio autem voluptate similique atque, alias possimus quis vitae in, officiis labore deserunt aspernatur rerum sunt?</p>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      menuLoading: true,
      menuProducts: [],
      menuSwiperParams: {
        freeMode: true,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
        slidesPerView: 2.2
      }
    }
  },
  created() {
    this.getProductsMethod()
  },
  components: {
    NavbarLeftLinkBars: () => import('~/components/NavbarLeftLinkBars')
  },
  methods: {
    getProductsMethod() {
      this.$axios.get('/product?active=1&limit=10')
        .then(response => {
          this.menuProducts = response.data.data
          if (response.data.data.length <= 1) {
            this.menuSwiperParams.slidesPerView = 1
          }
        })
        .finally(() => {
          this.menuLoading = false
        })
    },
    menuAddMethod(id) {
      this.$f7.dialog.preloader()
      setTimeout(() => {
        this.$f7.dialog.close()
      }, 2000);
    }
  }
}
</script>

<style>
.index--menu--card--button--add {
  width: 100%;
}
.index--menu--card--header {
  background-position: center;
  height: 0;
  padding-bottom: 100%;
}
</style>
