"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { dialCodes, DEFAULT_DIAL_ISO } from "@/lib/dialCodes";
import { CheckIcon } from "./CheckIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { cn } from "@/lib/cn";

const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .replace(/[‘’]/g, "'")
    .toLowerCase();

const HAYSTACK = dialCodes.map((country) => ({
  ...country,
  search: `${fold(country.name)} ${country.dial} ${country.dial.slice(1)} ${country.iso.toLowerCase()}`,
}));

interface CountrySelectProps {
  name: string;
  defaultIso?: string;
}

export function CountrySelect({ name, defaultIso }: CountrySelectProps) {
  const initial = HAYSTACK.some((c) => c.iso === defaultIso)
    ? (defaultIso as string)
    : DEFAULT_DIAL_ISO;

  const [iso, setIso] = useState(initial);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listId = useId();
  const optionId = (index: number) => `${listId}-option-${index}`;

  const selected = HAYSTACK.find((c) => c.iso === iso) ?? HAYSTACK[0];

  const matches = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return HAYSTACK;
    return HAYSTACK.filter((c) => c.search.includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const revealActive = useCallback((center: boolean) => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[data-active="true"]');
    if (!list || !el) return;
    const top = el.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    const height = el.offsetHeight;
    if (center) {
      list.scrollTop = top - list.clientHeight / 2 + height / 2;
    } else if (top < list.scrollTop) {
      list.scrollTop = top;
    } else if (top + height > list.scrollTop + list.clientHeight) {
      list.scrollTop = top + height - list.clientHeight;
    }
  }, []);

  useEffect(() => {
    if (open) revealActive(true);
  }, [open, revealActive]);

  useEffect(() => {
    if (open) revealActive(false);
  }, [open, active, revealActive]);

  const openList = () => {
    setQuery("");
    setActive(Math.max(0, HAYSTACK.findIndex((c) => c.iso === iso)));
    setOpen(true);
  };

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (nextIso: string) => {
    setIso(nextIso);
    close(true);
  };

  const onSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(matches.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (matches[active]) choose(matches[active].iso);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openList();
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <input type="hidden" name={name} value={iso} />

      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country dial code"
        /* Sized and stripped to sit on an underline field row rather than in a
           box of its own: the only border is the divider to the number input,
           and the fixed width holds that divider still as the country changes. */
        className={cn(
          "flex w-[11.5rem] shrink-0 cursor-pointer items-center gap-2 py-1 pr-4 sm:w-[12rem]",
          "border-r border-grey-500 bg-transparent text-left text-body-lg",
          "transition-colors duration-300 ease-in-out",
          "focus:outline-none",
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          <span className="text-contrast [[data-tone=dark]_&]:text-white">
            {selected.name}
          </span>{" "}
          <span className="text-grey-600 [[data-tone=dark]_&]:text-grey-300">
            {selected.dial}
          </span>
        </span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 text-grey-600 [[data-tone=dark]_&]:text-grey-300",
            "transition-transform duration-300 ease-in-out",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-[calc(100%+0.8px)] left-0 z-20",
            "w-[19rem] max-w-[calc(100vw-3rem)] border-[0.8px] border-grey-200 bg-base",
          )}
        >
          <div className="border-b-[0.8px] border-grey-200">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKeyDown}
              placeholder="Search countries"
              aria-label="Search countries"
              aria-controls={listId}
              aria-activedescendant={matches[active] ? optionId(active) : undefined}
              className={cn(
                "w-full bg-base px-4 py-3 text-body",
                "placeholder:text-grey-600 focus:outline-none",
              )}
            />
          </div>

          {matches.length === 0 ? (
            <p className="px-4 py-6 text-body text-grey-600">No countries match that search.</p>
          ) : (
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Country dial code"
              className="max-h-64 overflow-y-auto py-1"
            >
              {matches.map((country, index) => {
                const isSelected = country.iso === iso;
                return (
                  <li key={country.iso}>
                    <button
                      type="button"
                      id={optionId(index)}
                      role="option"
                      aria-selected={isSelected}
                      data-active={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(country.iso)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left",
                        "transition-colors duration-150 ease-in-out",
                        "focus:outline-none data-[active=true]:bg-base-2",
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "size-3.5 shrink-0 text-accent",
                          !isSelected && "invisible",
                        )}
                      />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-body",
                          isSelected ? "text-accent" : "text-contrast",
                        )}
                      >
                        {country.name}
                      </span>
                      <span className="shrink-0 text-body text-grey-600">{country.dial}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
