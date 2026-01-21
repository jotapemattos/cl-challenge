import { Button } from '@base-ui/react'
import { Field } from '@base-ui/react/field'
import { Select } from '@base-ui/react/select'
import { CaretDown, Check } from '@phosphor-icons/react'

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'author-asc'
  | 'author-desc'

const sortLabels: Record<SortOption, string> = {
  'date-desc': 'Date (Newest first)',
  'date-asc': 'Date (Oldest first)',
  'title-asc': 'Title (A-Z)',
  'title-desc': 'Title (Z-A)',
  'author-asc': 'Author (A-Z)',
  'author-desc': 'Author (Z-A)',
}

const sortOptions = Object.keys(sortLabels) as SortOption[]

interface PostFiltersProps {
  searchText: string
  onSearchTextChange: (value: string) => void
  authorFilter: string
  onAuthorFilterChange: (value: string) => void
  sortOption: SortOption
  onSortOptionChange: (value: SortOption) => void
}

export function PostFilters({
  searchText,
  onSearchTextChange,
  authorFilter,
  onAuthorFilterChange,
  sortOption,
  onSortOptionChange,
}: PostFiltersProps) {
  const hasActiveFilters =
    searchText || authorFilter || sortOption !== 'date-desc'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col md:flex-row gap-3">
        <Field.Root className="w-full md:flex-1 flex flex-col gap-1">
          <Field.Label className="text-sm font-medium text-gray-700">
            Search
          </Field.Label>
          <Field.Control
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="Search posts..."
            className="border border-foreground rounded-lg h-8 w-full px-4 placeholder:text-muted-foreground text-sm"
          />
        </Field.Root>

        <Field.Root className="w-full md:flex-1 flex flex-col gap-1">
          <Field.Label className="text-sm font-medium text-gray-700">
            Author
          </Field.Label>
          <Field.Control
            value={authorFilter}
            onChange={(e) => onAuthorFilterChange(e.target.value)}
            placeholder="Username..."
            className="border border-foreground rounded-lg h-8 w-full px-4 placeholder:text-muted-foreground text-sm"
          />
        </Field.Root>

        <div className="w-full md:flex-1 flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-700">Sort by</p>
          <Select.Root
            value={sortOption}
            onValueChange={(value) => onSortOptionChange(value as SortOption)}
          >
            <Select.Trigger className="flex items-center justify-between border border-foreground rounded-lg h-8 w-full px-4 text-sm bg-white cursor-pointer">
              <Select.Value>{sortLabels[sortOption]}</Select.Value>
              <Select.Icon>
                <CaretDown size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4} align="start">
                <Select.Popup className="w-[var(--anchor-width)] bg-white border border-muted-foreground rounded-lg shadow-lg py-1 z-50">
                  {sortOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                    >
                      <Select.ItemText>{sortLabels[option]}</Select.ItemText>
                      <Select.ItemIndicator>
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      {hasActiveFilters ? (
        <Button
          type="button"
          onClick={() => {
            onSearchTextChange('')
            onAuthorFilterChange('')
            onSortOptionChange('date-desc')
          }}
          className="self-start text-sm text-brand hover:underline cursor-pointer"
        >
          Clear all filters
        </Button>
      ) : null}
    </div>
  )
}
