"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PartnershipInquiryRow, RegistrationRow } from "@/lib/db";
import { attendanceCategories, attendanceCategoryLabel } from "@/lib/schemas";

const PAGE_SIZE = 10;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function useSearchAndPaginate<T>(rows: T[], getSearchText: (row: T) => string) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return rows;
    }
    return rows.filter((row) => getSearchText(row).toLowerCase().includes(q));
  }, [rows, query, getSearchText]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return { query, onQueryChange, filtered, page: currentPage, setPage, totalPages, pageRows };
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full max-w-[320px]">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-copy"
      />
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-9 pl-8"
      />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 rounded-none border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ink"
    >
      <option value="">{label}: All</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
  totalResults,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalResults: number;
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <p className="text-xs text-muted-copy">
        Page {page} of {totalPages} · {totalResults} result
        {totalResults === 1 ? "" : "s"}
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-none"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-none"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function RegistrationsTable({ rows }: { rows: RegistrationRow[] }) {
  const [countryFilter, setCountryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const countryOptions = useMemo(
    () =>
      Array.from(new Set(rows.map((row) => row.country.trim())))
        .sort((a, b) => a.localeCompare(b))
        .map((country) => ({ value: country, label: country })),
    [rows],
  );

  const filteredByDropdowns = useMemo(
    () =>
      rows.filter(
        (row) =>
          (!countryFilter || row.country === countryFilter) &&
          (!categoryFilter || row.attendance_category === categoryFilter),
      ),
    [rows, countryFilter, categoryFilter],
  );

  const getSearchText = (row: RegistrationRow) =>
    [
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.organization,
      row.role,
      row.country,
      attendanceCategoryLabel(row.attendance_category),
    ]
      .filter(Boolean)
      .join(" ");

  const { query, onQueryChange, filtered, page, setPage, totalPages, pageRows } =
    useSearchAndPaginate(filteredByDropdowns, getSearchText);

  if (rows.length === 0) {
    return <p className="text-sm text-copy">No registrations yet.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder="Search registrations…"
        />
        <FilterSelect
          label="Country"
          value={countryFilter}
          onChange={(value) => {
            setCountryFilter(value);
            setPage(1);
          }}
          options={countryOptions}
        />
        <FilterSelect
          label="Category"
          value={categoryFilter}
          onChange={(value) => {
            setCategoryFilter(value);
            setPage(1);
          }}
          options={attendanceCategories.map((category) => ({
            value: category.value,
            label: category.label,
          }))}
        />
      </div>
      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-copy">No registrations match your search.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.06em] text-muted-copy uppercase">
                <th className="py-2 pr-4">Submitted</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Organization</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Accessibility notes</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 align-top">
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {row.first_name} {row.last_name}
                  </td>
                  <td className="py-2 pr-4">{row.email}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {row.phone || "—"}
                  </td>
                  <td className="py-2 pr-4">{row.organization}</td>
                  <td className="py-2 pr-4">{row.role}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{row.country}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {attendanceCategoryLabel(row.attendance_category)}
                  </td>
                  <td className="py-2 pr-4">{row.accessibility_needs || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        totalResults={filtered.length}
      />
    </div>
  );
}

export function PartnershipInquiriesTable({
  rows,
}: {
  rows: PartnershipInquiryRow[];
}) {
  const getSearchText = (row: PartnershipInquiryRow) =>
    [row.name, row.email, row.organization, row.role, row.message]
      .filter(Boolean)
      .join(" ");

  const { query, onQueryChange, filtered, page, setPage, totalPages, pageRows } =
    useSearchAndPaginate(rows, getSearchText);

  if (rows.length === 0) {
    return <p className="text-sm text-copy">No partnership inquiries yet.</p>;
  }

  return (
    <div>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search partnership inquiries…"
      />
      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-copy">
          No partnership inquiries match your search.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.06em] text-muted-copy uppercase">
                <th className="py-2 pr-4">Submitted</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Organization</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 align-top">
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="py-2 pr-4 whitespace-nowrap">{row.name}</td>
                  <td className="py-2 pr-4">{row.email}</td>
                  <td className="py-2 pr-4">{row.organization}</td>
                  <td className="py-2 pr-4">{row.role}</td>
                  <td className="py-2 pr-4 max-w-[360px] whitespace-pre-line">
                    {row.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        totalResults={filtered.length}
      />
    </div>
  );
}
