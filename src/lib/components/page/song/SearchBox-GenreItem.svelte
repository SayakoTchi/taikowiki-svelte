<script lang="ts" context="module">
    function clickHandle(group: string | undefined, value: Genre) {
        if (group !== value) {
            return value;
        } else {
            return undefined;
        }
    }
</script>

<script lang="ts">
    import color from "$lib/module/common/color";
    import type { Genre } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";

    export let group: string | undefined;
    export let value: Genre;

    let data: HTMLElement;
    $: text = data?.innerText;

    let transform = "";
    $: if (text?.includes(" ")) {
        transform = "transform: translateY(-1px);";
    }

    let widthType: "long" | "short";
    $: if (data?.clientWidth) {
        if (data.clientWidth > 60 || data.innerText.includes(' ')) {
            widthType = "long";
        } else {
            widthType = "short";
        }
    }

    const [theme] = getTheme();
</script>

<div
    class={`button ${widthType}`}
    class:selected={group === value}
    class:unselected={group !== value && group !== undefined}
    style={`background-color:${color.genre[value]};`}
    on:click={() => {
        group = clickHandle(group, value);
    }}
    role="presentation"
    data-theme={$theme}
>
    <span bind:this={data} style={`${transform} text-wrap:nowrap;`}>
        <slot />
    </span>
</div>
<input type="radio" bind:group {value} />

<style>
    input {
        display: none;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 5px;

        height: 30px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 14px;

        box-sizing: border-box;

        cursor: pointer;
    }

    .button.selected {
        border: 2px solid #1c1c1c;
    }
    .button.unselected {
        opacity: 0.4;
    }

    .button.long {
        width: 110px;
    }
    .button.short {
        width: 60px;
    }

    .button.selected[data-theme="dark"] {
        border-color: white;
    }
</style>
