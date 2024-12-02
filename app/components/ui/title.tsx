import { tv } from "tailwind-variants";
import StainIcon from "~icons/ta/stain";

// STYLES **********************************************************************************************************************************
export const TITLE = tv({
  slots: {
    ROOT: `relative inline-flex`,
    STAIN: `absolute left-0`,
    TEXT: `font-heading relative inline-flex uppercase`,
  },
});
const { ROOT, STAIN, TEXT } = TITLE();

// MAIN ************************************************************************************************************************************
export function Title({ className = {}, text }: TitleProps) {
  const C = typeof className === "string" ? { ROOT: className } : className;
  if (!text) return;

  return (
    <div className={ROOT({ className: C.ROOT })}>
      <StainIcon width="100%" height="100%" className={STAIN({ className: C.STAIN ?? "-top-1 text-primary-400" })} />
      <h3 className={TEXT({ className: C.TEXT ?? "px-6 py-2 text-3xl" })}>{text}</h3>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type TitleProps = {
  className?: Partial<(typeof TITLE)["slots"]> | string;
  text?: string;
};
