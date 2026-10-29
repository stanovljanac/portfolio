import type { ReactNode } from "react";
import type { Shot } from "../data/projects";

/* A screenshot in a browser window drawn in CSS (.browser in site.css):
   a bar with three dots and the site's address, then the 16:10 view.
   Without a shot, `children` fill the view instead. */
export function BrowserFrame({
  url,
  shot,
  sizes,
  eager = false,
  className = "",
  children,
}: {
  url?: string;
  shot?: Shot;
  sizes: string;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={["browser", className].filter(Boolean).join(" ")}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <i />
          <i />
          <i />
        </span>
        {url ? <span className="browser__url">{new URL(url).host}</span> : null}
      </div>
      <div className="browser__view">
        {shot ? (
          <img
            src={shot.src}
            srcSet={shot.srcSet}
            sizes={shot.srcSet ? sizes : undefined}
            alt=""
            width={shot.width}
            height={shot.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
