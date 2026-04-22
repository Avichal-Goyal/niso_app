import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox"

export function FiltersSidebar() {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

    const toggleCategory = (id) => {
        setSelectedCategoryIds((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setSelectedCategoryIds([]);
                    }}
                >
                    Clear
                </Button>
            </div>

            <div className="space-y-3">
                <p className="text-sm font-medium">Categories</p>
                <div className="space-y-2">
                    {
                        categories.map((cat) => {
                            const checked = selectedCategoryIds.include(cat._id);

                            return (
                                <label
                                    key = {cat._id}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <Checkbox
                                        checked={checked}
                                        onCheckedChange={() => toggleCategory(cat._id)}
                                    />
                                    <span>{cat.title}</span>
                                </label>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}