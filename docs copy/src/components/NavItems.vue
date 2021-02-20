<script lang="tsx">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
// import Bem from '@@/bem'
import { use } from '@@/utils';
import { PackageItemGroup, PackageItem } from '../constant';

@Component({})
export default class NavItems extends Vue {
  @Prop() readonly list!: PackageItemGroup[]

  created() {
  }

  @Emit('change')
  redirect(nav: PackageItem): PackageItem {
    this.$router.push(`/${nav.name}`);
    return nav;
  }

  isActive(nav: PackageItem): boolean {
    return this.$route.path.substring(1) === nav.name;
  }

  render() {
    const [bem] = use('nav');

    return (
      <div class={bem('wrap')}>{
        this.list.map((group) => (
          <div class={bem('group', false)}>
            <div class={bem('group', 'title', false)}>{ group.title }</div>
            {
              group.items.map((nav) => (
                <div
                  class={bem(['item', { active: this.isActive(nav) }], false)}
                  onClick={this.redirect.bind(this, nav)}
                >
                  { nav.title }
                </div>
              ))
            }
          </div>
        ))
      }</div>
    );
  }
}
</script>

<style lang="stylus">
  @import '../../../packages/style/var.styl'

  .esc-nav
    &__group
      &--title
        font-size 16px
        color: #455a64
        line-height: 24px
        font-weight 700
        padding: 10px 0 0 40px
        @media (min-width 1440px)
           padding: 10px 20px 10px 40px
    &__item
      font-size 12px
      color: #455a64
      padding: 10px 0 0 40px
      line-height: 24px
      cursor pointer
      @media (min-width 1440px)
        font-size 14px
        padding: 10px 20px 10px 40px
    &__active
      color link-color
</style>
