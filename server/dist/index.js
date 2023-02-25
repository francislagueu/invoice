"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const auth_1 = require("./middlewares/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/profile', auth_1.IsAuthenticated, profile_route_1.default);
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
})
    .catch((error) => console.log(`${error} did not connect`));
